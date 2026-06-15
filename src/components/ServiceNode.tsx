// src/components/ServiceNode.tsx

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { Check, Database, Server, Settings, TriangleAlert } from "lucide-react";

import type { IAppStatus, INodeTab, IServiceNodeData, NodeType } from "../types";

const STATUS_STYLES: Record<IAppStatus, string> = {
  Healthy:
    "bg-[var(--color-healthy-bg)] text-[var(--color-healthy)] border border-[var(--color-healthy-border)]",
  Degraded:
    "bg-[var(--color-degraded-bg)] text-[var(--color-degraded)] border border-[var(--color-degraded-border)]",
  Down: "bg-[var(--color-down-bg)] text-[var(--color-down)] border border-[var(--color-down-border)]",
};

const STATUS_DOT: Record<IAppStatus, string> = {
  Healthy: "bg-[var(--color-healthy)]",
  Degraded: "bg-[var(--color-degraded)]",
  Down: "bg-[var(--color-down)]",
};

const TABS: INodeTab[] = ["CPU", "Memory", "Disk", "Region"];

const NODE_TYPE_STYLES: Record<
  NodeType,
  {
    label: string;
    Icon: typeof Server;
    badge: string;
  }
> = {
  service: {
    label: "Service",
    Icon: Server,
    badge:
      "border-[var(--color-border)] text-[var(--color-text-muted)] bg-[var(--color-control-muted)]",
  },
  db: {
    label: "Database",
    Icon: Database,
    badge:
      "border-[var(--color-border)] text-[var(--color-text-muted)] bg-[var(--color-control-muted)]",
  },
};

function getSliderColor(value: number): string {
  if (value < 40) return "var(--color-usage-low)";
  if (value < 70) return "var(--color-usage-medium)";
  return "var(--color-usage-high)";
}

export type ServiceNodeType = Node<IServiceNodeData>;

export function ServiceNode({ data, selected }: NodeProps<ServiceNodeType>) {
  const nodeType = data.nodeType ?? "service";
  const nodeTypeStyle = NODE_TYPE_STYLES[nodeType];
  const NodeTypeIcon = nodeTypeStyle.Icon;

  return (
    <div
      className={`
        w-[280px] rounded-xl bg-[var(--color-card-bg)] border
        ${selected ? "border-[var(--color-border-strong)]" : "border-[var(--color-border)]"}
        p-4 shadow-[0_18px_40px_var(--color-node-shadow)]
      `}
    >
      {/* Handles for edges */}
      <Handle type="target" position={Position.Left} className="!bg-[var(--color-border-strong)]" />
      <Handle type="source" position={Position.Right} className="!bg-[var(--color-border-strong)]" />
      {/* <Handle type="target" position={Position.Top} className="!bg-[var(--color-border-strong)]" />
      <Handle type="source" position={Position.Bottom} className="!bg-[var(--color-border-strong)]" /> */}

      {/* Top row: label + cost + settings */}
      <div className="flex items-center justify-between mb-3">
        <div className="min-w-0">
          <span className="block truncate text-[var(--color-text)] font-semibold text-sm">
            {data.label}
          </span>
          <span
            className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${nodeTypeStyle.badge}`}
          >
            <NodeTypeIcon size={11} strokeWidth={2} />
            {nodeTypeStyle.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-control-muted)] text-[var(--color-silver-bright)] border border-[var(--color-border)]">
            {data.costPerHr}
          </span>
          <Settings
            size={15}
            className="text-[var(--color-text-subtle)] cursor-pointer hover:text-[var(--color-text)]"
          />
        </div>
      </div>

      {/* Stat numbers */}
      <div className="flex justify-between text-[var(--color-text-muted)] text-xs mb-2 px-1">
        <span>0.02</span>
        <span>0.05 GB</span>
        <span>10.00 GB</span>
        <span>1</span>
      </div>

      {/* Tab row */}
      <div className="flex gap-1 mb-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`
              flex-1 text-xs py-1 rounded
              ${
                data.activeTab === tab
                  ? "bg-[var(--color-text)] text-[var(--color-inverse-text)] font-medium"
                  : "bg-[var(--color-control-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-control-hover)]"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 relative h-2 rounded-full bg-[var(--color-control-muted)]">
          <div
            className="absolute left-0 top-0 h-2 rounded-full transition-all"
            style={{
              width: `${data.sliderValue}%`,
              backgroundColor: getSliderColor(data.sliderValue),
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-text)] shadow"
            style={{ left: `calc(${data.sliderValue}% - 6px)` }}
          />
        </div>
        <span className="text-[var(--color-text-muted)] text-xs w-8 text-right">
          {data.sliderValue}
        </span>
      </div>

      {/* Status pill */}
      <div
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${STATUS_STYLES[data.status]}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[data.status]}`}
        />
        {data.status === "Healthy" ? (
          <Check size={13} strokeWidth={2} />
        ) : (
          <TriangleAlert size={13} strokeWidth={2} />
        )}
        {data.status}
      </div>
    </div>
  );
}
