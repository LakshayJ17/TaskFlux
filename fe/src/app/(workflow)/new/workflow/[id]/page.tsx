"use client"

import React, { useState } from "react";
import WorkflowSidebar from "@/components/Workflow/WorkflowSidebar";
import WorkFlowCanvas from "@/components/Workflow/WorkFlowCanvas";

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);


  // Handle trigger selection
  const handleTriggerSelect = (trigger) => {
    if (nodes.length > 0 && nodes[0].type.endsWith("trigger")) return; // Only one trigger
    setNodes([
      {
        id: `trigger-${Date.now()}`,
        type: trigger.type,
        data: { label: trigger.label, config: trigger.config || {} },
        position: { x: 100, y: 100 }
      },
      ...nodes
    ]);
  };

  // Handle node selection from sidebar
  const handleNodeSelect = (node) => {
    setNodes([
      ...nodes,
      {
        id: `${node.type}-${Date.now()}`,
        type: node.type,
        data: { label: node.label, config: node.config || {} },
        position: { x: 200 + nodes.length * 50, y: 200 }
      }
    ]);
  };

  return (
    <div className="flex h-screen">
      <WorkflowSidebar onTriggerSelect={handleTriggerSelect} onNodeSelect={handleNodeSelect} />
      <div className="flex-1">
        <WorkFlowCanvas nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
      </div>
    </div>
  );
}