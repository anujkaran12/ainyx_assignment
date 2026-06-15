// src/mocks/handlers.ts

import { http, HttpResponse } from "msw";
import { mockApps, mockGraphs } from "./data";

export const handlers = [
  http.get("/apps", async () => {
    await delay(600);
    return HttpResponse.json(mockApps);
  }),

  http.get("/apps/:appId/graph", async ({ params }) => {
    await delay(800);
    const appId = params.appId as string;
    const graph = mockGraphs[appId];

    if (!graph) {
      return new HttpResponse(null, { status: 404 });
    }

    // Simulate random error for app-3 to demo error state
    if (appId === "app-3" && Math.random() < 0.4) {
      return new HttpResponse(null, { status: 500 });
    }

    return HttpResponse.json(graph);
  }),
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
