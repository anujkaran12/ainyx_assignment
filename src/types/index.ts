import type { Node, Edge } from '@xyflow/react';

export type IAppStatus = 'Healthy' | 'Degraded' | 'Down';
export type INodeTab = 'CPU' | 'Memory' | 'Disk' | 'Region';
export type IInspectorTab = 'Config' | 'Runtime';
export type NodeType = 'service' | 'db';

export interface IApp {
  id: string;
  name: string;
  color: string;
}

export interface IServiceNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  status: IAppStatus;
  nodeType?: NodeType;
  sliderValue: number;
  activeTab: INodeTab;
  costPerHr: string;
}

// Use ReactFlow's own Node type directly
export type IServiceNode = Node<IServiceNodeData>;
export type IServiceEdge = Edge;

export interface IAppGraph {
  nodes: IServiceNode[];
  edges: IServiceEdge[];
}
