// src/components/LeftRail.tsx

import { Database, GitBranch, Leaf, Network, Package } from "lucide-react";
import { Button } from "./ui/button";

const railItems = [
  { id: "github", Icon: GitBranch },
  { id: "postgres", Icon: Database },
  { id: "redis", Icon: Package },
  { id: "mongo", Icon: Leaf },
  { id: "network", Icon: Network },
];

export function LeftRail() {
  return (
    <div className="w-14 bg-[var(--color-panel-bg)] border-r border-[var(--color-border)] flex flex-col items-center py-4 gap-4 flex-shrink-0">
      {railItems.map(({ id, Icon }) => (
        <Button
          key={id}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--color-silver)] hover:text-[var(--color-text)] hover:bg-[var(--color-control-hover)] transition-all"
        >
          <Icon size={18} strokeWidth={1.8} />
        </Button>
      ))}
    </div>
  );
}
