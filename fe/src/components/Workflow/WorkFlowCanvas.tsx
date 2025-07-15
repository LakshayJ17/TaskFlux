"use client"

import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import LLMNodeConfig from './LLMNodeConfig';

export default function WorkFlowCanvas() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // Render LLMNodeConfig in a custom node, or as a sidebar/modal

  return (
    <div style={{ width: '100vw', height: '90vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      {/* Example: <LLMNodeConfig onConfigChange={...} /> */}
    </div>
  );
}