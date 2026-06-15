import type { IApp, IAppGraph } from '../types';

export const mockApps: IApp[] = [
  { id: 'app-1', name: 'supertokens-golang', color: '#7C3AED' },
  { id: 'app-2', name: 'supertokens-java', color: '#6366F1' },
  { id: 'app-3', name: 'supertokens-python', color: '#EF4444' },
  { id: 'app-4', name: 'supertokens-ruby', color: '#8B5CF6' },
  
];

export const mockGraphs: Record<string, IAppGraph> = {

  // app-1: 3 nodes, horizontal linear chain
  'app-1': {
    nodes: [
      {
        id: 'node-1',
        type: 'serviceNode',
        position: { x: 0, y: 150 },
        data: { label: 'Postgres', status: 'Healthy', nodeType: 'db', sliderValue: 2, activeTab: 'CPU', costPerHr: '$0.03/HR' },
      },
      {
        id: 'node-2',
        type: 'serviceNode',
        position: { x: 380, y: 150 },
        data: { label: 'Redis', status: 'Down', nodeType: 'db', sliderValue: 45, activeTab: 'CPU', costPerHr: '$0.03/HR' },
      },
      {
        id: 'node-3',
        type: 'serviceNode',
        position: { x: 760, y: 150 },
        data: { label: 'MongoDB', status: 'Degraded', nodeType: 'db', sliderValue: 78, activeTab: 'Memory', costPerHr: '$0.03/HR' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2' },
      { id: 'e2-3', source: 'node-2', target: 'node-3' },
    ],
  },

  // app-2: 4 nodes, horizontal chain with one branch below
  'app-2': {
    nodes: [
      {
        id: 'node-1',
        type: 'serviceNode',
        position: { x: 0, y: 100 },
        data: { label: 'MySQL', status: 'Healthy', nodeType: 'db', sliderValue: 10, activeTab: 'CPU', costPerHr: '$0.05/HR' },
      },
      {
        id: 'node-2',
        type: 'serviceNode',
        position: { x: 380, y: 0 },
        data: { label: 'Kafka', status: 'Healthy', nodeType: 'service', sliderValue: 30, activeTab: 'Disk', costPerHr: '$0.05/HR' },
      },
      {
        id: 'node-3',
        type: 'serviceNode',
        position: { x: 380, y: 240 },
        data: { label: 'Redis', status: 'Down', nodeType: 'db', sliderValue: 90, activeTab: 'CPU', costPerHr: '$0.05/HR' },
      },
      {
        id: 'node-4',
        type: 'serviceNode',
        position: { x: 760, y: 100 },
        data: { label: 'Elasticsearch', status: 'Healthy', nodeType: 'db', sliderValue: 55, activeTab: 'Memory', costPerHr: '$0.08/HR' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2' },
      { id: 'e1-3', source: 'node-1', target: 'node-3' },
      { id: 'e2-4', source: 'node-2', target: 'node-4' },
      { id: 'e3-4', source: 'node-3', target: 'node-4' },
    ],
  },

  // app-3: 2 nodes, simple horizontal
  'app-3': {
    nodes: [
      {
        id: 'node-1',
        type: 'serviceNode',
        position: { x: 0, y: 150 },
        data: { label: 'DynamoDB', status: 'Healthy', nodeType: 'db', sliderValue: 20, activeTab: 'CPU', costPerHr: '$0.04/HR' },
      },
      {
        id: 'node-2',
        type: 'serviceNode',
        position: { x: 380, y: 150 },
        data: { label: 'RabbitMQ', status: 'Degraded', nodeType: 'service', sliderValue: 65, activeTab: 'Memory', costPerHr: '$0.04/HR' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2' },
    ],
  },
 

  // app-4: 3 nodes, horizontal with middle branching
  'app-4': {
    nodes: [
      {
        id: 'node-1',
        type: 'serviceNode',
        position: { x: 0, y: 150 },
        data: { label: 'Nginx', status: 'Healthy', nodeType: 'service', sliderValue: 8, activeTab: 'CPU', costPerHr: '$0.02/HR' },
      },
      {
        id: 'node-2',
        type: 'serviceNode',
        position: { x: 380, y: 0 },
        data: { label: 'VectorDB', status: 'Down', nodeType: 'db', sliderValue: 95, activeTab: 'Disk', costPerHr: '$0.09/HR' },
      },
      {
        id: 'node-3',
        type: 'serviceNode',
        position: { x: 380, y: 300 },
        data: { label: 'Memcached', status: 'Degraded', nodeType: 'db', sliderValue: 60, activeTab: 'Memory', costPerHr: '$0.03/HR' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2' },
      { id: 'e1-3', source: 'node-1', target: 'node-3' },
      { id: 'e2-3', source: 'node-2', target: 'node-3' },
    ],
  },
};
