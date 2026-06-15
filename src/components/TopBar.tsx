// src/components/TopBar.tsx

import { useReactFlow } from "@xyflow/react";
import {
  ChevronUp,
  Moon,
  MoreHorizontal,
  PanelRight,
  Share2,
} from "lucide-react";
import { useApps } from "../hooks/useApps";
import { useAppStore } from "../store/useAppStore";
import { Button } from "./ui/button";
import { useState } from "react";
import { AddNodeForm } from "./AddNodeForm";

export function TopBar() {
  const { selectedAppId, isMobilePanelOpen, setMobilePanelOpen } =
    useAppStore();
  const { data: apps } = useApps();

  const selectedApp = apps?.find((a) => a.id === selectedAppId);

  const { fitView } = useReactFlow();

  const [showAddNode, setShowAddNode] = useState(false);

  return (
    <div className="h-14 bg-[var(--color-panel-bg)] border-b border-[var(--color-border)] flex items-center px-4 gap-4 flex-shrink-0">
      {/* Brand logo */}
      <div className="w-8 h-8 rounded-lg bg-[var(--color-text)] flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_var(--color-border)]">
        <span className="text-[var(--color-inverse-text)] text-xs font-bold">
          AG
        </span>
      </div>

      {/* Selected app name */}
      <div className="flex items-center gap-2 bg-[var(--color-control-muted)] border border-[var(--color-border)] rounded-lg px-3 py-1.5">
        {selectedApp && (
          <span
            className="w-4 h-4 rounded-sm flex-shrink-0"
            style={{ backgroundColor: selectedApp.color }}
          />
        )}
        <span className="text-[var(--color-text)] text-sm font-medium truncate max-w-[160px]">
          {selectedApp?.name ?? "Select an app"}
        </span>
        <ChevronUp size={14} className="text-[var(--color-text-subtle)]" />
        <MoreHorizontal size={16} className="text-[var(--color-text-subtle)]" />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setShowAddNode(true)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border-[var(--color-border-strong)] bg-[var(--color-control-hover)] text-white transition-all"
        >
          + Add Node
        </Button>

        {/* Fit view hint */}
        <Button
          onClick={() => fitView({ duration: 300, padding: 0.2 })}
          className="text-[var(--color-text)] text-xs px-2 py-1 rounded border border-[var(--color-border-strong)] bg-[var(--color-control-hover)] transition-all"
        >
          Fit View
        </Button>

        {/* Share */}
        <Button className="text-[var(--color-silver)] hover:text-[var(--color-text)] p-2 rounded-lg hover:bg-[var(--color-control-hover)] transition-all">
          <Share2 size={16} strokeWidth={1.8} />
        </Button>

        {/* Dark mode toggle placeholder */}
        <Button className="text-[var(--color-silver)] hover:text-[var(--color-text)] p-2 rounded-lg hover:bg-[var(--color-control-hover)] transition-all">
          <Moon size={16} strokeWidth={1.8} />
        </Button>

        {/* Mobile panel toggle - only visible on small screens */}
        <Button
          onClick={() => setMobilePanelOpen(!isMobilePanelOpen)}
          className="lg:hidden text-[var(--color-silver)] hover:text-[var(--color-text)] p-2 rounded-lg hover:bg-[var(--color-control-hover)] transition-all"
        >
          <PanelRight size={16} strokeWidth={1.8} />
        </Button>
      </div>
       {/* Add Node overlay */}
     <AddNodeForm open={showAddNode} onClose={() => setShowAddNode(false)} />
    </div>
  );
}
