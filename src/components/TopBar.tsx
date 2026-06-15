// src/components/TopBar.tsx

import { useReactFlow } from "@xyflow/react";
import {
  ChevronUp,
  Maximize2,
  Moon,
  MoreHorizontal,
  PanelRight,
  Plus,
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
    <div className="h-14 bg-[var(--color-panel-bg)] border-b border-[var(--color-border)] flex items-center px-3 sm:px-4 gap-2 sm:gap-4 flex-shrink-0">
      {/* Brand logo */}
      <div className="w-8 h-8 rounded-lg bg-[var(--color-text)] flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_var(--color-border)]">
        <span className="text-[var(--color-inverse-text)] text-xs font-bold">
          AG
        </span>
      </div>

      {/* Selected app name */}
      <div className="min-w-0 flex flex-1 sm:flex-none items-center gap-2 bg-[var(--color-control-muted)] border border-[var(--color-border)] rounded-lg px-2.5 sm:px-3 py-1.5">
        {selectedApp && (
          <span
            className="w-4 h-4 rounded-sm flex-shrink-0"
            style={{ backgroundColor: selectedApp.color }}
          />
        )}
        <span className="text-[var(--color-text)] text-sm font-medium truncate max-w-[120px] sm:max-w-[180px] md:max-w-[240px]">
          {selectedApp?.name ?? "Select an app"}
        </span>
        <ChevronUp
          size={14}
          className="hidden sm:block text-[var(--color-text-subtle)]"
        />
        <MoreHorizontal
          size={16}
          className="hidden sm:block text-[var(--color-text-subtle)]"
        />
      </div>

      {/* Spacer */}
      <div className="hidden sm:block flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        <Button
          onClick={() => setShowAddNode(true)}
          aria-label="Add node"
          className="h-9 w-9 sm:w-auto flex items-center justify-center gap-1.5 text-xs px-0 sm:px-3 rounded border-[var(--color-border-strong)] bg-[var(--color-control-hover)] text-white transition-all"
        >
          <Plus size={16} strokeWidth={2} />
          <span className="hidden sm:inline">Add Node</span>
        </Button>

        {/* Fit view hint */}
        <Button
          onClick={() => fitView({ duration: 300, padding: 0.2 })}
          aria-label="Fit view"
          className="h-9 w-9 md:w-auto flex items-center justify-center gap-1.5 text-[var(--color-text)] text-xs px-0 md:px-2 rounded border border-[var(--color-border-strong)] bg-[var(--color-control-hover)] transition-all"
        >
          <Maximize2 size={15} strokeWidth={1.8} />
          <span className="hidden md:inline">Fit View</span>
        </Button>

        {/* Share */}
        <Button
          aria-label="Share"
          className="hidden sm:flex text-[var(--color-silver)] hover:text-[var(--color-text)] p-2 rounded-lg hover:bg-[var(--color-control-hover)] transition-all"
        >
          <Share2 size={16} strokeWidth={1.8} />
        </Button>

        {/* Dark mode toggle placeholder */}
        <Button
          aria-label="Theme"
          className="hidden sm:flex text-[var(--color-silver)] hover:text-[var(--color-text)] p-2 rounded-lg hover:bg-[var(--color-control-hover)] transition-all"
        >
          <Moon size={16} strokeWidth={1.8} />
        </Button>

        {/* Mobile panel toggle - only visible on small screens */}
        <Button
          onClick={() => setMobilePanelOpen(!isMobilePanelOpen)}
          aria-label="Toggle app panel"
          aria-expanded={isMobilePanelOpen}
          className="lg:hidden h-9 w-9 flex items-center justify-center text-[var(--color-silver)] hover:text-[var(--color-text)] p-2 rounded-lg hover:bg-[var(--color-control-hover)] transition-all"
        >
          <PanelRight size={16} strokeWidth={1.8} />
        </Button>
      </div>
      {/* Add Node overlay */}
      <AddNodeForm open={showAddNode} onClose={() => setShowAddNode(false)} />
    </div>
  );
}
