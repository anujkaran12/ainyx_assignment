// src/hooks/useApps.ts

import { useQuery } from "@tanstack/react-query";
import type { IApp } from "../types";

async function fetchApps(): Promise<IApp[]> {
  const res = await fetch("/apps");
  if (!res.ok) throw new Error("Failed to fetch apps");
  return res.json();
}

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });
}
