import { useCallback } from "react";
import { useNodesData, useReactFlow } from "@xyflow/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "../store/useAppStore";
import type {
  IAppStatus,
  IServiceNode,
  IServiceNodeData,
  IInspectorTab,
} from "../types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const STATUS_COLOR: Record<IAppStatus, string> = {
  Healthy:
    "bg-[var(--color-healthy-bg)] text-[var(--color-healthy)] border border-[var(--color-healthy-border)]",
  Degraded:
    "bg-[var(--color-degraded-bg)] text-[var(--color-degraded)] border border-[var(--color-degraded-border)]",
  Down: "bg-[var(--color-down-bg)] text-[var(--color-down)] border border-[var(--color-down-border)]",
};

const STATUS_INACTIVE: Record<IAppStatus, string> = {
  Healthy:
    "bg-[var(--color-control-bg)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:bg-[var(--color-healthy-bg)] hover:text-[var(--color-healthy)]",
  Degraded:
    "bg-[var(--color-control-bg)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:bg-[var(--color-degraded-bg)] hover:text-[var(--color-degraded)]",
  Down: "bg-[var(--color-control-bg)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:bg-[var(--color-down-bg)] hover:text-[var(--color-down)]",
};

function clampUsage(value: number) {
  return Math.min(100, Math.max(0, value));
}

function getUsageColor(value: number) {
  if (value < 40) return "var(--color-usage-low)";
  if (value < 70) return "var(--color-usage-medium)";
  return "var(--color-usage-high)";
}

export function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } =
    useAppStore();
  const { setNodes } = useReactFlow();

  const nodeData = useNodesData<IServiceNode>(selectedNodeId ?? "");
  const data = nodeData?.data as IServiceNodeData | undefined;

  const updateField = useCallback(
    (field: keyof IServiceNodeData, value: unknown) => {
      if (!selectedNodeId) return;
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === selectedNodeId
            ? { ...node, data: { ...node.data, [field]: value } }
            : node,
        ),
      );
    },
    [selectedNodeId, setNodes],
  );

  if (!selectedNodeId || !data) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-[var(--color-text-faint)] text-sm text-center">
          Select a node on the canvas to inspect it
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[var(--color-text)] font-semibold text-sm">Service Node</span>
        <Badge
          className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLOR[data.status]}`}
        >
          {data.status}
        </Badge>
      </div>

      <Tabs
        value={activeInspectorTab}
        onValueChange={(value) =>
          setActiveInspectorTab(value as IInspectorTab)
        }
        className="flex flex-col gap-3"
      >
        <TabsList className="w-full bg-[var(--color-control-bg)] border border-[var(--color-border)] p-1">
          <TabsTrigger
            value="Config"
            className={cn('flex-1 text-xs text-[var(--color-text-muted)] data-active:bg-[var(--color-control-hover)] data-active:text-[var(--color-text)] data-active:shadow-none p-1', activeInspectorTab === 'Config' && 'bg-[var(--color-text)] text-[var(--color-inverse-text)]')}
          >
            Config
          </TabsTrigger>
          <TabsTrigger
            value="Runtime"
             className={cn('flex-1 text-xs text-[var(--color-text-muted)] data-active:bg-[var(--color-control-hover)] data-active:text-[var(--color-text)] data-active:shadow-none', activeInspectorTab === 'Runtime' && 'bg-[var(--color-text)] text-[var(--color-inverse-text)] p-1')}
          >
            Runtime
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Config" className="flex flex-col gap-4 mt-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-[var(--color-text-muted)] text-xs">Node Name</label>
            <Input
              value={data.label}
              onChange={(event) => {
                updateField("label", event.target.value);
              }}
              className="bg-[var(--color-control-bg)] border-[var(--color-border)] text-[var(--color-text)] text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[var(--color-text-muted)] text-xs">Description</label>
            <Textarea
              value={data.description ?? ""}
              onChange={(event) => {
                updateField("description", event.target.value);
              }}
              placeholder="Add a description..."
              rows={3}
              className="bg-[var(--color-control-bg)] border-[var(--color-border)] text-[var(--color-text)] text-sm resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[var(--color-text-muted)] text-xs">Status</label>
            <div className="flex gap-2">
              {(["Healthy", "Degraded", "Down"] as IAppStatus[]).map(
                (status) => (
                  <Button
                    key={status}
                    onClick={() => updateField("status", status)}
                    className={`
                      flex-1 text-xs py-1.5 rounded-md border transition-all cursor-pointer
                      ${
                        data.status === status
                          ? STATUS_COLOR[status]
                          : STATUS_INACTIVE[status]
                      }
                    `}
                  >
                    {status}
                  </Button>
                ),
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Runtime" className="flex flex-col gap-4 mt-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-[var(--color-text-muted)] text-xs">CPU Usage</label>
            <div className="flex items-center gap-3">
              <div className="relative h-7 flex-1">
                <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[var(--color-control-muted)]">
                  <div
                    className="h-full rounded-full transition-[width,background-color]"
                    style={{
                      width: `${data.sliderValue}%`,
                      backgroundColor: getUsageColor(data.sliderValue),
                    }}
                  />
                </div>
                <span
                  className="pointer-events-none absolute top-1/2 block h-4 w-4 -translate-y-1/2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-text)] shadow"
                  style={{ left: `calc(${data.sliderValue}% - 8px)` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={data.sliderValue}
                  onChange={(event) =>
                    updateField(
                      "sliderValue",
                      clampUsage(Number(event.target.value)),
                    )
                  }
                  className="absolute inset-0 h-7 w-full cursor-pointer opacity-0"
                  aria-label="CPU Usage"
                />
              </div>
              <Input
                type="number"
                min={0}
                max={100}
                value={data.sliderValue}
                onChange={(event) => {
                  updateField(
                    "sliderValue",
                    clampUsage(Number(event.target.value)),
                  );
                }}
                className="w-16 bg-[var(--color-control-bg)] border-[var(--color-border)] text-[var(--color-text)] text-sm text-center"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[var(--color-text-muted)] text-xs">Cost per Hour</label>
            <Input
              value={data.costPerHr}
              onChange={(event) =>
                updateField("costPerHr", event.target.value)
              }
              className="bg-[var(--color-control-bg)] border-[var(--color-border)] text-[var(--color-text)] text-sm"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
