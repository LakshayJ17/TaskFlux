"use client"

import { useCallback, useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Shield, Layers, Clock, BarChart3, ArrowRight, Mail, MessageSquare, Brain, Database, } from "lucide-react"
import { ReactFlow, Background, useNodesState, useEdgesState, addEdge, type Connection, type Edge, type Node, BackgroundVariant, Controls, Handle, Position, } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import Footer from "../layout/Footer"
import Header from "../layout/Header"
import IntegrationsMarquee from "./Integrations"
import VideoDemo from "../demo/VideoDemo"
import CTASection from "./CTA"
// import FeaturesCarousel from "./FeaturesCarousel"
import { Rocket } from "@/components/ui/Rocket"
import { useRouter } from "next/navigation"
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLoggedIn"
import FAQsection from "./FAQsection"

// Custom Node Components
const CustomTriggerNode = ({ data }) => {
  return (
    <div className="relative">
      <div className="w-48 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg border-2 border-emerald-300 flex items-center justify-center text-white font-semibold animate-pulse-slow transition-colors duration-300 hover:bg-emerald-500 hover:from-emerald-500 hover:to-emerald-500 hover:text-white">
        <Mail className="h-6 w-6 mr-3" />
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-emerald-500" />
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
    </div>
  )
}

const CustomProcessNode = ({ data }) => {
  return (
    <div className="relative">
      <div className="w-48 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-lg border-2 border-violet-300 flex items-center justify-center text-white font-semibold transition-colors duration-300 hover:bg-violet-500 hover:from-violet-500 hover:to-violet-500 hover:text-white">
        <Brain className="h-6 w-6 mr-3" />
        {data.label}
      </div>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-violet-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-violet-500" />
      <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
    </div>
  )
}

const CustomActionNode = ({ data }) => {
  return (
    <div className="relative">
      <div className="w-48 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg border-2 border-blue-300 flex items-center justify-center text-white font-semibold transition-colors duration-300 hover:bg-emerald-500 hover:from-emerald-500 hover:to-emerald-500 hover:text-white">
        <MessageSquare className="h-6 w-6 mr-3" />
        {data.label}
      </div>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500" />
    </div>
  )
}

const CustomDatabaseNode = ({ data }) => {
  return (
    <div className="relative">
      <div className="w-48 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg border-2 border-orange-300 flex items-center justify-center text-white font-semibold transition-colors duration-300 hover:bg-violet-500 hover:from-violet-500 hover:to-violet-500 hover:text-white">
        <Database className="h-6 w-6 mr-3" />
        {data.label}
      </div>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-orange-500" />
    </div>
  )
}

const nodeTypes = {
  trigger: CustomTriggerNode,
  process: CustomProcessNode,
  action: CustomActionNode,
  database: CustomDatabaseNode,
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "trigger",
    data: { label: "New Support Email" },
    position: { x: 50, y: 100 },
  },
  {
    id: "2",
    type: "process",
    data: { label: "AI Sentiment Analysis" },
    position: { x: 350, y: 50 },
  },
  {
    id: "3",
    type: "process",
    data: { label: "Category Detection" },
    position: { x: 350, y: 150 },
  },
  {
    id: "4",
    type: "action",
    data: { label: "Generate AI Response" },
    position: { x: 650, y: 100 },
  },
  {
    id: "5",
    type: "action",
    data: { label: "Send Email Reply" },
    position: { x: 950, y: 50 },
  },
  {
    id: "6",
    type: "database",
    data: { label: "Update CRM Record" },
    position: { x: 950, y: 150 },
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 3 },
    markerEnd: { type: "arrowclosed", color: "#10b981" },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 3 },
    markerEnd: { type: "arrowclosed", color: "#10b981" },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
    style: { stroke: "#7c3aed", strokeWidth: 3 },
    markerEnd: { type: "arrowclosed", color: "#7c3aed" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: "#7c3aed", strokeWidth: 3 },
    markerEnd: { type: "arrowclosed", color: "#7c3aed" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 3 },
    markerEnd: { type: "arrowclosed", color: "#3b82f6" },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 3 },
    markerEnd: { type: "arrowclosed", color: "#f97316" },
  },
]

// Hero Section Component
function HeroSection({ nodes, edges, onNodesChange, onEdgesChange, onConnect }) {
  const router = useRouter();

  const [isExecuting, setIsExecuting] = useState(false)

  // Simulate workflow execution
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExecuting(true)
      setTimeout(() => setIsExecuting(false), 3000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero-section"
      className="relative pt-25 px-6 bg-gradient-to-br from-emerald-400/40 via-white to-violet-400/40 overflow-hidden dark:bg-gradient-to-r dark:from-emerald-950 dark:via-black dark:to-purple-950/40 animate-gradient"
    >

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:75px_75px]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 animate-fade-in delay-400">
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-4xl md:text-6xl text-emerald-600 leading-tight font-bold dark:text-emerald-500">
            Automate Your Workflows
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-violet-500 bg-clip-text text-transparent animate-gradient">
              Without Limits
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400/90  max-w-5xl mx-auto leading-relaxed">
            Build powerful automation workflows with our visual editor. Connect your favorite apps, automate repetitive tasks, and focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-400">
            <Button
              onClick={() => router.push('/signup')}
              size="lg"
              className="cursor-pointer bg-violet-500 hover:bg-violet-600 text-white  p-6 text-lg transform transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Rocket />
              Start Building Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer px-8 py-4 text-lg backdrop-blur-sm border-emerald-800 hover:bg-emerald-50 hover:border-emerald-600 transform transition-all duration-300 p-6 text-black hover:text-black dark:text-white"
            >
              Watch Live Demo
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Demo */}
        <div className="max-w-6xl mx-auto animate-fade-in delay-600">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-100 p-8 transform hover:scale-[1.01] transition-all duration-500">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-semibold text-gray-900">Customer Support Automation</h3>
                <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Live Workflow
                </Badge>
              </div>

            </div>

            <div className="h-96 border-2 border-gray-200 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-white relative">
              {isExecuting && (
                <div className="absolute top-4 right-4 z-10 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  Executing Workflow...
                </div>
              )}
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                proOptions={{ hideAttribution: true }}
                className="workflow-canvas"
              >
                <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#10b981" />
                <Controls className="bg-white/90 backdrop-blur-sm" />
              </ReactFlow>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



export default function WorkflowLanding() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [email, setEmail] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)

  useRedirectIfLoggedIn();

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const features = [
    {
      icon: <Brain className="h-12 w-12" />,
      title: "AI-Powered Processing",
      description:
        "Advanced natural language processing and sentiment analysis powered by OpenAI GPT-4 and free Gemini models. Understand customer intent with 98% accuracy.",
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
    },
    {
      icon: <Layers className="h-12 w-12" />,
      title: "Smart Integrations",
      description:
        "Connect with 500+ apps and services. From email and CRM to social media and databases. Build complex workflows that span your entire tech stack.",
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Real-time Intelligence",
      description:
        "Process and respond to events in real-time. AI-powered decision making that adapts to context and learns from interactions for better outcomes.",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Enterprise Security",
      description:
        "Bank-grade security with end-to-end encryption. SOC 2 compliant with GDPR support. Your data and AI interactions are always protected and private.",
      gradient: "from-violet-500 to-indigo-600",
      bgGradient: "from-violet-50 to-indigo-50",
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Team Collaboration",
      description:
        "Built for teams. Share workflows, collaborate on AI prompts, and manage permissions. Version control and rollback capabilities for safe deployments.",
      gradient: "from-emerald-500 to-cyan-600",
      bgGradient: "from-emerald-50 to-cyan-50",
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "Advanced Analytics",
      description:
        "Comprehensive analytics and monitoring. Track AI performance, workflow efficiency, and business impact. Optimize your automation with data-driven insights.",
      gradient: "from-violet-500 to-pink-600",
      bgGradient: "from-violet-50 to-pink-50",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#202C39]">
      <Header />
      <HeroSection
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
      {/* <FreeSection /> */}
      {/* <FeaturesCarousel
        features={features}
        currentSlide={currentSlide}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        goToSlide={goToSlide}
      /> */}
      <VideoDemo />
      <FAQsection />
      <IntegrationsMarquee />
      {/* <CTASection email={email} setEmail={setEmail} /> */}
      <Footer />
    </div>
  )
}
