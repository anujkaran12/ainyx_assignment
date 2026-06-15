// src/components/RightPanel.tsx

import { ChevronRight } from "lucide-react";
import { useApps } from "../hooks/useApps";
import { useAppStore } from "../store/useAppStore";
import { NodeInspector } from "./NodeInspector";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function RightPanel() {
  const {
    selectedAppId,
    setSelectedAppId,
    isMobilePanelOpen,
    setMobilePanelOpen,
  } = useAppStore();
  const { data: apps, isLoading } = useApps();

  const RenderAppsList = () => {
    return apps?.map((app) => {
      return (
        <Button
          key={app.id}
          onClick={() => {
            setSelectedAppId(app.id);
            setMobilePanelOpen(false);
          }}
          className={`
                      w-full flex items-center gap-3 px-3 py-5 rounded-lg text-sm transition-all
                      ${
                        selectedAppId === app.id
                          ? "bg-[var(--color-text)] text-[var(--color-inverse-text)]"
                          : "text-[var(--color-silver)] hover:bg-[var(--color-control-hover)] hover:text-[var(--color-text)]"
                      }
                    `}
        >
          {/* App color icon */}
          <span
            className="w-6 h-6 rounded-md flex-shrink-0"
            style={{ backgroundColor: app.color }}
          />
          <span className="truncate text-left">{app.name}</span>
          <ChevronRight size={15} className="ml-auto opacity-50" />
        </Button>
      );
    });
  };
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobilePanelOpen && (
        <div
          className="fixed inset-0 bg-[var(--color-overlay)] z-20 lg:hidden"
          onClick={() => setMobilePanelOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`
          fixed right-0 top-0 h-full w-72 bg-[var(--color-panel-bg)] border-l border-[var(--color-border)]
          flex flex-col z-30 transition-transform duration-300
          lg:relative lg:translate-x-0
          ${isMobilePanelOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* App List Section */}
        <div className="border-b border-[var(--color-border)]">
          <div className="p-4">
            <h2 className="text-[var(--color-text-muted)] text-xs font-medium uppercase tracking-wider mb-3">
              Application
            </h2>

            {/* Search box */}
            <Input
              placeholder="Search..."
              className="bg-[var(--color-control-bg)] border-[var(--color-border)] text-[var(--color-text-muted)] mb-3"
            />

            {/* App list */}
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 rounded-lg bg-[var(--color-control-muted)] animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-1 max-h-56 overflow-y-auto">
                {RenderAppsList()}
              </div>
            )}
          </div>
        </div>

        {/* Node Inspector Section */}
        <NodeInspector />
      </div>
    </>
  );
}
