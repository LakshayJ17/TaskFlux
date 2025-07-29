"use client"

import React, { useCallback } from 'react';
import { ReactFlow, addEdge, applyNodeChanges, applyEdgeChanges, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


export default function WorkFlowCanvas({ nodes, setNodes, edges, setEdges }) {
  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="w-full h-[90vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}