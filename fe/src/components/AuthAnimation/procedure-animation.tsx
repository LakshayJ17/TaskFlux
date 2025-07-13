"use client"

import { useEffect, useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { ReactFlow, Background, useNodesState, useEdgesState, type Node, type Edge, useReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css"

type ProcedureAnimationProps = {}

function ProcedureFlow() {
  const pathname = usePathname()
  const currentRoute = pathname?.includes("signin") ? "signin" : "signup"

  const getStepLabels = (route: "signup" | "signin") => [
    "User details received",
    route === "signup" ? "Adding user to Database" : "Getting user from Database",
    "Preparing experience",
    "Redirecting to dashboard",
  ]

  const stepLabels = getStepLabels(currentRoute)

  // Center nodes vertically in the fixed height container
  const getNodePosition = (index: number) => {
    const baseY = 80;
    const spacing = 160;
    return {
      x: 0,
      y: baseY + index * spacing,
    };
  };

  const initialNodes: Node[] = stepLabels.map((label, index) => ({
    id: `step-${index + 1}`,
    type: "default",
    position: getNodePosition(index),
    data: { label },
    style: {
      background: "transparent",
      border: "2px solid rgba(16, 185, 129, 0.2)",
      borderRadius: "12px",
      padding: "16px 24px",
      fontSize: "16px",
      fontWeight: "500",
      color: "rgba(16, 185, 129, 0.2)",
      width: "280px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.5s ease-in-out",
      boxShadow: "none",
    },
  }))

  // Curved edges with custom paths
  const initialEdges: Edge[] = [
    {
      id: "e1-2",
      source: "step-1",
      target: "step-2",
      type: "bezier",
      animated: true,
      style: {
        stroke: "rgba(16, 185, 129, 0.2)",
        strokeWidth: 3,
        transition: "all 0.5s ease-in-out",
      },
    },
    {
      id: "e2-3",
      source: "step-2",
      target: "step-3",
      type: "bezier",
      animated: true,
      style: {
        stroke: "rgba(16, 185, 129, 0.2)",
        strokeWidth: 3,
        transition: "all 0.5s ease-in-out",
      },
    },
    {
      id: "e3-4",
      source: "step-3",
      target: "step-4",
      type: "bezier",
      animated: true,
      style: {
        stroke: "rgba(16, 185, 129, 0.2)",
        strokeWidth: 3,
        transition: "all 0.5s ease-in-out",
      },
    },
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [currentStep, setCurrentStep] = useState(0)

  const updateNodeStyle = useCallback((nodeId: string, isActive: boolean, isPrevious: boolean) => {
    const baseStyle = {
      borderRadius: "12px",
      padding: "16px 24px",
      fontSize: "16px",
      fontWeight: "500",
      width: "280px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "box-shadow 0.5s, border 0.5s, color 0.5s, background 0.5s",
    }

    if (isActive) {
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)",
        border: "3px solid #10b981",
        color: "#ffffff",
        boxShadow: "0 0 32px 8px rgba(16,185,129,0.35), 0 0 0 2px #10b981",
        fontWeight: "600",
      }
    } else if (isPrevious) {
      return {
        ...baseStyle,
        background: "rgba(16, 185, 129, 0.15)",
        border: "2px solid rgba(16, 185, 129, 0.4)",
        color: "rgba(16, 185, 129, 0.8)",
        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
      }
    } else {
      return {
        ...baseStyle,
        background: "rgba(255, 255, 255, 0.05)",
        border: "2px solid rgba(16, 185, 129, 0.1)",
        color: "rgba(16, 185, 129, 0.3)",
        boxShadow: "none",
      }
    }
  }, [])

  const updateEdgeStyle = useCallback((edgeId: string, isActive: boolean, isPrevious: boolean) => {
    if (isActive) {
      return {
        stroke: "#10b981",
        strokeWidth: 4,
        transition: "all 0.5s ease-in-out",
        filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))",
      }
    } else if (isPrevious) {
      return {
        stroke: "rgba(16, 185, 129, 0.5)",
        strokeWidth: 3,
        transition: "all 0.5s ease-in-out",
      }
    } else {
      return {
        stroke: "rgba(16, 185, 129, 0.15)",
        strokeWidth: 2,
        transition: "all 0.5s ease-in-out",
      }
    }
  }, [])

  // Update node positions on window resize
  useEffect(() => {
    // No-op: keep positions fixed
  }, [])

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentStep < 4) {
          setCurrentStep((prev) => prev + 1)
        }
      },
      currentStep === 0 ? 500 : 2500,
    )
    return () => clearTimeout(timer)
  }, [currentStep])

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node, index) => ({
        ...node,
        style: updateNodeStyle(node.id, index + 1 === currentStep, index + 1 < currentStep),
      })),
    )
    setEdges((edges) =>
      edges.map((edge, index) => ({
        ...edge,
        style: updateEdgeStyle(edge.id, index + 1 === currentStep - 1, index + 1 < currentStep - 1),
      })),
    )
  }, [currentStep, updateNodeStyle, updateEdgeStyle, setNodes, setEdges])

  return (
    <div style={{ width: 500, height: 700 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        // No fitView, no defaultViewport, no minZoom/maxZoom
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}

export default function ProcedureAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-purple-50 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-full" style={{ minHeight: '100vh', minWidth: '100vw' }}>
          <div style={{ width: 500, height: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ReactFlowProvider>
              <ProcedureFlow />
            </ReactFlowProvider>
          </div>
        </div>
      </div>
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-transparent to-purple-500 opacity-20"></div>
      </div>
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5 pointer-events-none"></div>
    </div>
  )
}

