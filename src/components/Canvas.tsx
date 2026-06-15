import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { ServiceNode } from "./ServiceNode";
import { useAppStore } from "../store/useAppStore";
import { useAppGraph } from "../hooks/useAppGraph";
import type { IServiceNodeData } from "@/types";

// Register custom node type - key must match type: 'serviceNode' in mock data
const nodeTypes: NodeTypes = {
  serviceNode: ServiceNode,
};

export function Canvas() {
  const { selectedAppId, setSelectedNodeId } = useAppStore();
  const { data, isLoading, isError } = useAppGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<IServiceNodeData>>(
    [],
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // When graph data loads or app changes, update ReactFlow nodes + edges
  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
    }
  }, [data, setNodes, setEdges]);

  // When a node is clicked, store its id in Zustand
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId],
  );

  // Clicking empty canvas deselects node
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  // Delete selected node on Delete/Backspace key
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        setNodes((nds) => nds.filter((n) => !n.selected));
        setSelectedNodeId(null);
      }
    },
    [setNodes, setSelectedNodeId],
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--color-app-bg)]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--color-silver-bright)] border-t-transparent rounded-full animate-spin" />
          <span className="text-[var(--color-text-subtle)] text-sm">
            Loading graph...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--color-app-bg)]">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[var(--color-danger)] text-2xl">!</span>
          <span className="text-[var(--color-text-muted)] text-sm">
            Failed to load graph
          </span>
          <span className="text-[var(--color-text-faint)] text-xs">
            Try selecting a different app
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 bg-[var(--color-app-bg)]"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={null}
        className="bg-[var(--color-app-bg)]"
        defaultEdgeOptions={{
          type: "bezier",
          style: { stroke: "", strokeWidth: 1.5, opacity: 0.6 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="var(--color-canvas-grid)"
        />
        <Controls className="!bg-[var(--color-panel-bg)] !border-[var(--color-border)] !text-[var(--color-text)]" />
      </ReactFlow>
    </div>
  );
}
