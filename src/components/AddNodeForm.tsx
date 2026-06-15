import { useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { Check, Database, Server, TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAppStore } from "../store/useAppStore";
import type { IAppStatus, NodeType, IServiceNodeData } from "../types";

interface AddNodeFormProps {
  open: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS: IAppStatus[] = ["Healthy", "Degraded", "Down"];
const NODE_TYPE_OPTIONS: {
  value: NodeType;
  label: string;
  Icon: typeof Server;
  activeClassName: string;
}[] = [
  {
    value: "service",
    label: "Service",
    Icon: Server,
    activeClassName:
      "border-[var(--color-app-1)] bg-[var(--color-control-hover)] text-[var(--color-text)]",
  },
  {
    value: "db",
    label: "Database",
    Icon: Database,
    activeClassName:
      "border-[var(--color-app-2)] bg-[var(--color-control-hover)] text-[var(--color-text)]",
  },
];

const STATUS_CLASSNAMES: Record<IAppStatus, string> = {
  Healthy: "text-[var(--color-healthy)]",
  Degraded: "text-[var(--color-degraded)]",
  Down: "text-[var(--color-down)]",
};

function getNextNodeIndex(existingIds: Set<string>) {
  let index = existingIds.size + 1;

  while (existingIds.has(`node-${index}`)) {
    index += 1;
  }

  return index;
}

export function AddNodeForm({ open, onClose }: AddNodeFormProps) {
  const { addNodes, getNodes } = useReactFlow();
  const { setSelectedNodeId } = useAppStore();

  const [label, setLabel] = useState("");
  const [status, setStatus] = useState<IAppStatus>("Healthy");
  const [nodeType, setNodeType] = useState<NodeType>("service");
  const [costPerHr, setCostPerHr] = useState("$0.03/HR");
  const [error, setError] = useState("");

  const handleClose = () => {
    setLabel("");
    setStatus("Healthy");
    setNodeType("service");
    setCostPerHr("$0.03/HR");
    setError("");
    onClose();
  };

  const handleSubmit = () => {
    const trimmedLabel = label.trim();

    if (!trimmedLabel) {
      setError("Node name is required");
      return;
    }

    const existingIds = new Set(getNodes().map((node) => node.id));
    const nextIndex = getNextNodeIndex(existingIds);
    const id = `node-${nextIndex}`;
    const column = (nextIndex - 1) % 3;
    const row = Math.floor((nextIndex - 1) / 3);

    const newNode = {
      id,
      type: "serviceNode",
      position: {
        x: 100 + column * 320,
        y: 100 + row * 240,
      },
      data: {
        label: trimmedLabel,
        status,
        nodeType,
        sliderValue: 0,
        activeTab: "CPU",
        costPerHr,
      } satisfies IServiceNodeData,
    };

    addNodes(newNode);
    setSelectedNodeId(id);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) handleClose();
      }}
    >
      <DialogContent className="w-[420px] border border-[var(--color-border)] bg-[var(--color-panel-bg)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--color-text)]">
            Add New Node
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 pt-2">
          <div className="flex flex-col gap-2">
            <Label className="text-[var(--color-text-muted)]">Node Type</Label>
            <div className="flex gap-2">
              {NODE_TYPE_OPTIONS.map(
                ({ value, label: optionLabel, Icon, activeClassName }) => (
                  <Button
                    key={value}
                    variant="outline"
                    onClick={() => setNodeType(value)}
                    className={cn(
                      "group flex-1 gap-2 border border-[var(--color-border)] bg-[var(--color-control-muted)] text-[var(--color-text-muted)] transition-all hover:bg-[var(--color-control-hover)] hover:text-[var(--color-text)]",
                      nodeType === value && activeClassName,
                    )}
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.8}
                      className={cn(
                        "text-[var(--color-text-subtle)] group-hover:text-[var(--color-text)]",
                        nodeType === value &&
                          (value === "service"
                            ? "text-[var(--color-app-1)]"
                            : "text-[var(--color-app-2)]"),
                      )}
                    />
                    {optionLabel}
                  </Button>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[var(--color-text-muted)]">
              Node Name <span className="text-[var(--color-danger)]">*</span>
            </Label>
            <Input
              placeholder="e.g. Postgres, Redis, Auth Service"
              value={label}
              onChange={(event) => {
                setLabel(event.target.value);
                setError("");
              }}
              className={cn(
                "border bg-[var(--color-control-bg)] text-sm text-[var(--color-text)]",
                error
                  ? "border-[var(--color-danger)]"
                  : "border-[var(--color-border)]",
              )}
            />
            {error && (
              <span className="text-xs text-[var(--color-danger)]">
                {error}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[var(--color-text-muted)]">
              Cost per Hour
            </Label>
            <Input
              placeholder="$0.03/HR"
              value={costPerHr}
              onChange={(event) => setCostPerHr(event.target.value)}
              className="border border-[var(--color-border)] bg-[var(--color-control-bg)] text-sm text-[var(--color-text)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[var(--color-text-muted)]">
              Initial Status
            </Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as IAppStatus)}
            >
              <SelectTrigger className="border border-[var(--color-border)] bg-[var(--color-control-bg)] text-sm text-[var(--color-text)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                align="start"
                sideOffset={6}
                alignItemWithTrigger={false}
                className="w-[185px] border border-[var(--color-border)] bg-[var(--color-panel-bg)] shadow-[0_18px_40px_var(--color-node-shadow)]"
              >
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className={STATUS_CLASSNAMES[option]}
                  >
                    <span className="inline-flex items-center gap-2">
                      {option === "Healthy" ? (
                        <Check size={14} strokeWidth={2} />
                      ) : (
                        <TriangleAlert size={14} strokeWidth={2} />
                      )}
                      {option}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 border border-[var(--color-border)] bg-[var(--color-control-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-control-hover)] hover:text-[var(--color-text)]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 border border-[var(--color-border-strong)] bg-[var(--color-control-hover)] text-[var(--color-text)] hover:bg-[var(--color-control-muted)]"
            >
              Add Node
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
