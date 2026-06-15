import { ReactFlowProvider } from '@xyflow/react';
import { TopBar } from './components/TopBar';
import { LeftRail } from './components/LeftRail';
import { Canvas } from './components/Canvas';
import { RightPanel } from './components/RightPanel';

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen bg-[var(--color-app-bg)] flex flex-col overflow-hidden">

        {/* Top bar spans full width */}
        <TopBar />

        {/* Below top bar - left rail + canvas + right panel */}
        <div className="flex flex-1 overflow-hidden">
          <LeftRail />
          <Canvas />
          <RightPanel />
        </div>

      </div>
    </ReactFlowProvider>
  );
}
