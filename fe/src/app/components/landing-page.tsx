"use client"

import { useCallback, useState, useEffect} from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Play,
  Users,
  Shield,
  Layers,
  Clock,
  BarChart3,
  ArrowRight,
  Gift,
  Mail,
  MessageSquare,
  Brain,
  Database,
  Zap,
  Key,
  CreditCard,
} from "lucide-react"
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import Footer from "./Footer"
import Header from "./Header"
import IntegrationsMarquee from "./Integrations"
import VideoDemo from "./VideoDemo"
import CTASection from "./CTA"
import FreeSection from "./FreeSection"
import FeaturesCarousel from "./FeaturesCarousel"

// Custom Node Components
const CustomTriggerNode = ({ data }) => {
  return (
    <div className="relative">
      <div className="w-48 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg border-2 border-emerald-300 flex items-center justify-center text-white font-semibold animate-pulse-slow">
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
      <div className="w-48 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-lg border-2 border-violet-300 flex items-center justify-center text-white font-semibold">
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
      <div className="w-48 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg border-2 border-blue-300 flex items-center justify-center text-white font-semibold">
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
      <div className="w-48 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg border-2 border-orange-300 flex items-center justify-center text-white font-semibold">
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
      className="relative py-20 px-6 bg-gradient-to-br from-emerald-50 via-white to-violet-50 overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center space-y-8 mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 leading-tight animate-slide-up">
            Automate Your Workflows
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-violet-500 bg-clip-text text-transparent animate-gradient">
              Without Limits
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-200">
            Build powerful automation workflows with our visual editor. Connect your favorite apps, automate repetitive tasks, and focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-400">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-violet-500 hover:from-emerald-600 hover:to-violet-600 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Play className="mr-3 h-6 w-6" />
              Start Building Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg bg-white/80 backdrop-blur-sm border-emerald-200 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300"
            >
              Watch Live Demo
              <ArrowRight className="ml-3 h-6 w-6" />
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

function PricingSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your AI Power</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible options to fit your needs. Start free and scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="relative overflow-hidden border-2 border-emerald-200 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Gift className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Forever</h3>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
                <div className="text-gray-600">Forever</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Unlimited workflows</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Free Gemini AI integration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Bring your own OpenAI key</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Community support</span>
                </li>
              </ul>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Get Started Free</Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative overflow-hidden border-2 border-violet-200 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-400">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500"></div>
            <div className="absolute top-4 right-4 bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Zap className="h-12 w-12 text-violet-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay-per-Use</h3>
                <p className="text-gray-600">We provide the AI power</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">$0.02</div>
                <div className="text-gray-600">per AI operation</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-violet-500 mr-3" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-violet-500 mr-3" />
                  <span>Premium OpenAI models</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-violet-500 mr-3" />
                  <span>No API key management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-violet-500 mr-3" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full bg-violet-500 hover:bg-violet-600">Start with Credits</Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative overflow-hidden border-2 border-gray-200 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-600">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 to-gray-700"></div>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600">For large organizations</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">Custom</div>
                <div className="text-gray-600">Volume pricing</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Custom AI models</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-500 mr-3" />
                  <span>SLA guarantees</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 bg-transparent">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* API Key Options */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 animate-fade-in delay-800">
          <div className="text-center mb-8">
            <Key className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Integration Options</h3>
            <p className="text-gray-600">Choose how you want to power your AI workflows</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-emerald-50 rounded-xl">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Bring Your Own Key</h4>
              <p className="text-gray-600 mb-4">
                Use your own OpenAI API key for maximum control and transparency. Perfect for developers and power
                users.
              </p>
              <Badge className="bg-emerald-100 text-emerald-700">Free Forever</Badge>
            </div>

            <div className="text-center p-6 bg-violet-50 rounded-xl">
              <div className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Pay-as-you-Go</h4>
              <p className="text-gray-600 mb-4">
                We handle the API keys and billing. Just focus on building amazing workflows. Simple, transparent
                pricing.
              </p>
              <Badge className="bg-violet-100 text-violet-700">$0.02 per operation</Badge>
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
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
      <FreeSection />
      <FeaturesCarousel
        features={features}
        currentSlide={currentSlide}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        goToSlide={goToSlide}
      />
      <PricingSection />
      <VideoDemo />
      <IntegrationsMarquee />
      <CTASection email={email} setEmail={setEmail} />
      <Footer />
    </div>
  )
}
