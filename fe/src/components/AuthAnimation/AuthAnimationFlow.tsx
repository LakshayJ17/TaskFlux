// "use client"

// import {
//     ReactFlow,
//     Background,
//     useNodesState,
//     useEdgesState,
//     Node,
//     Edge,
//     useReactFlow,
//   } from "@xyflow/react"
// import "@xyflow/react/dist/style.css"
// import { useEffect, useState } from "react"

// const nodeBaseStyle = {
//   background: '#f8fafc',
//   color: '#1e293b',
//   border: '1.5px solid #cbd5e1',
//   borderRadius: '10px',
//   padding: '14px',
//   fontSize: '15px',
//   fontWeight: 500,
//   boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
//   minWidth: '220px',
// }

// const allNodes: Node[] = [
//   {
//     id: "1",
//     type: "input",
//     position: { x: 0, y: -20 }, // try -20 or -40
//     data: { label: "User details received" },
//     style: { ...nodeBaseStyle, border: '2px solid #2563eb', color: '#2563eb', background: '#f1f5f9' },
//   },
//   {
//     id: "2",
//     position: { x: 0, y: 140 },
//     data: { label: "Creating user in DB" },
//     style: { ...nodeBaseStyle, border: '2px solid #64748b', color: '#334155', background: '#f8fafc' },
//   },
//   {
//     id: "3",
//     position: { x: 0, y: 280 },
//     data: { label: "Preparing experience" },
//     style: { ...nodeBaseStyle, border: '2px solid #0ea5e9', color: '#0ea5e9', background: '#f1f5f9' },
//   },
//   {
//     id: "4",
//     position: { x: 0, y: 420 },
//     data: { label: "Redirecting to dashboard" },
//     style: { ...nodeBaseStyle, border: '2px solid #22c55e', color: '#166534', background: '#f8fafc' },
//   },
// ]

// const allEdges: Edge[] = [
//   {
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     animated: true,
//     style: { stroke: '#64748b', strokeWidth: 2 },
//     type: 'smoothstep',
//   },
//   {
//     id: "e2-3",
//     source: "2",
//     target: "3",
//     animated: true,
//     style: { stroke: '#0ea5e9', strokeWidth: 2 },
//     type: 'smoothstep',
//   },
//   {
//     id: "e3-4",
//     source: "3",
//     target: "4",
//     animated: true,
//     style: { stroke: '#22c55e', strokeWidth: 2 },
//     type: 'smoothstep',
//   },
// ]

// // Animation steps: node, edge, node, edge, ...
// const totalSteps = allNodes.length + allEdges.length;

// export default function AuthAnimationFlow() {
//   const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
//   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
//   const [currentStep, setCurrentStep] = useState(0)
//   const [isAnimating, setIsAnimating] = useState(false)
//   const reactFlowInstance = useReactFlow();
//   const [hasFitView, setHasFitView] = useState(false);

//   const startAnimation = () => {
//     setNodes([])
//     setEdges([])
//     setCurrentStep(0)
//     setIsAnimating(true)
//   }

//   useEffect(() => {
//     if (!isAnimating) return

//     const timer = setTimeout(() => {
//       if (currentStep < totalSteps) {
//         // Even steps: add node, Odd steps: add edge
//         if (currentStep % 2 === 0) {
//           // Add node
//           const nodeIdx = currentStep / 2;
//           const baseNode = allNodes[nodeIdx];
//           const animatedNode = {
//             ...baseNode,
//             style: {
//               ...baseNode.style,
//               transform: 'scale(0.8)',
//               animation: 'nodeAppear 0.7s cubic-bezier(.4,2,.6,1) forwards',
//             },
//           };
//           setNodes(prev => [
//             ...prev,
//             animatedNode,
//           ]);
//         } else {
//           // Add edge
//           const edgeIdx = Math.floor(currentStep / 2);
//           setEdges(prev => [
//             ...prev,
//             allEdges[edgeIdx],
//           ]);
//         }
//         setCurrentStep(prev => prev + 1)
//       } else {
//         setIsAnimating(false)
//       }
//     }, 900)

//     return () => clearTimeout(timer)
//   }, [currentStep, setNodes, setEdges, isAnimating])

//   // Remove animation/transform from all previous nodes after each step
//   useEffect(() => {
//     setNodes(prev => prev.map((n, idx) => ({
//       ...n,
//       style: { ...allNodes[idx]?.style },
//     })));
//     // eslint-disable-next-line
//   }, [currentStep])

//   // Start animation when component mounts
//   useEffect(() => {
//     startAnimation()
//   }, [])

//   // Only fit view to top after the first node is rendered
//   useEffect(() => {
//     if (nodes.length === 1 && !hasFitView) {
//       reactFlowInstance.fitView({
//         padding: 0.01,
//         includeHiddenNodes: true,
//       });
//       setHasFitView(true);
//     }
//     // eslint-disable-next-line
//   }, [nodes.length, hasFitView]);

//   return (
//     <div style={{
//       height: '100vh',
//       width: '100vw',
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       zIndex: 50,
//       background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ef 100%)',
//       transition: 'background 0.5s',
//     }}>
//       <style jsx>{`
//         @keyframes nodeAppear {
//           0% {
//             transform: scale(0.8) translateY(-30px);
//             opacity: 0;
//           }
//           60% {
//             transform: scale(1.05) translateY(8px);
//             opacity: 0.8;
//           }
//           100% {
//             transform: scale(1) translateY(0);
//             opacity: 1;
//           }
//         }
//       `}</style>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         fitView
//         fitViewOptions={{ padding: 0.1, includeHiddenNodes: true }}
//         defaultViewport={{ x: 0, y: 0, zoom: 1 }}
//         minZoom={0.7}
//         maxZoom={1.2}
//         nodesDraggable={false}
//         nodesConnectable={false}
//         elementsSelectable={false}
//         panOnDrag={false}
//         zoomOnScroll={false}
//         zoomOnPinch={false}
//         zoomOnDoubleClick={false}
//       >
//         <Background
//           color="#e5e7eb"
//           gap={32}
//           size={1}
//           style={{ opacity: 0.18 }}
//         />
//       </ReactFlow>
//     </div>
//   )
// }

"use client"

import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  useReactFlow,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useEffect, useState } from "react"

const nodeBaseStyle = {
  background: '#f8fafc',
  color: '#1e293b',
  border: '1.5px solid #cbd5e1',
  borderRadius: '10px',
  padding: '14px',
  fontSize: '15px',
  fontWeight: 500,
  boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
  minWidth: '220px',
}

const allNodes: Node[] = [
  {
    id: "1",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "User details received" },
    style: { ...nodeBaseStyle, border: '2px solid #2563eb', color: '#2563eb', background: '#f1f5f9' },
  },
  {
    id: "2",
    position: { x: 0, y: 200 },
    data: { label: "Creating user in DB" },
    style: { ...nodeBaseStyle, border: '2px solid #64748b', color: '#334155', background: '#f8fafc' },
  },
  {
    id: "3",
    position: { x: 0, y: 400 },
    data: { label: "Preparing experience" },
    style: { ...nodeBaseStyle, border: '2px solid #0ea5e9', color: '#0ea5e9', background: '#f1f5f9' },
  },
  {
    id: "4",
    position: { x: 0, y: 600 },
    data: { label: "Redirecting to dashboard" },
    style: { ...nodeBaseStyle, border: '2px solid #22c55e', color: '#166534', background: '#f8fafc' },
  },
]

const allEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: '#64748b', strokeWidth: 2 },
    type: 'smoothstep',
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: '#0ea5e9', strokeWidth: 2 },
    type: 'smoothstep',
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: '#22c55e', strokeWidth: 2 },
    type: 'smoothstep',
  },
]

const totalSteps = allNodes.length + allEdges.length

export default function AuthAnimationFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const reactFlowInstance = useReactFlow()
  const [hasFitView, setHasFitView] = useState(false)

  const startAnimation = () => {
    setNodes([])
    setEdges([])
    setCurrentStep(0)
    setIsAnimating(true)
  }

  useEffect(() => {
    if (!isAnimating) return

    const timer = setTimeout(() => {
      if (currentStep < totalSteps) {
        if (currentStep % 2 === 0) {
          const nodeIdx = currentStep / 2
          const baseNode = allNodes[nodeIdx]
          const animatedNode = {
            ...baseNode,
            style: {
              ...baseNode.style,
              transform: 'scale(0.8)',
              animation: 'nodeAppear 0.7s cubic-bezier(.4,2,.6,1) forwards',
            },
          }
          setNodes(prev => [...prev, animatedNode])
        } else {
          const edgeIdx = Math.floor(currentStep / 2)
          setEdges(prev => [...prev, allEdges[edgeIdx]])
        }
        setCurrentStep(prev => prev + 1)
      } else {
        setIsAnimating(false)
      }
    }, 900)

    return () => clearTimeout(timer)
  }, [currentStep, setNodes, setEdges, isAnimating])

  useEffect(() => {
    setNodes(prev => prev.map((n, idx) => ({
      ...n,
      style: { ...allNodes[idx]?.style },
    })))
  }, [currentStep])

  useEffect(() => {
    startAnimation()
  }, [])

  useEffect(() => {
    if (nodes.length === 1 && !hasFitView) {
      reactFlowInstance.fitView({
        padding: 0.15,
        includeHiddenNodes: true,
      })
      setHasFitView(true)
    }
  }, [nodes.length, hasFitView])

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 50,
      background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ef 100%)',
    }}>
      <style jsx>{`
        @keyframes nodeAppear {
          0% {
            transform: scale(0.8) translateY(-30px);
            opacity: 0;
          }
          60% {
            transform: scale(1.05) translateY(8px);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.15, includeHiddenNodes: true }}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.7}
        maxZoom={1.2}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
      >
        <Background
          color="#e5e7eb"
          gap={32}
          size={1}
          style={{ opacity: 0.18 }}
        />
      </ReactFlow>
    </div>
  )
}
