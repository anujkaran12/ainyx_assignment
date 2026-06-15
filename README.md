# App Graph Builder

A small responsive ReactFlow canvas assignment built with React, Vite, TypeScript, TanStack Query, Zustand, shadcn-style UI primitives, and MSW mock APIs.

## Setup

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run checks:

```bash
npm run lint
npm run typecheck
```

## Features

- Responsive layout with top bar, left rail, right app panel, and dotted ReactFlow canvas.
- Mobile right panel slide-over controlled by Zustand.
- ReactFlow graph rendering with custom service nodes, edges, drag, selection, zoom, pan, and fit view.
- Node inspector with Config and Runtime tabs.
- Editable node name, description, status, CPU usage, and hourly cost.
- Synced range slider and numeric input for runtime usage.
- TanStack Query data fetching from MSW mock endpoints.
- Loading and error states for graph fetching.
- Add Node modal with Service and Database node type selection.

## Key Decisions

- MSW is used for mock APIs so the app behaves like it is fetching from a backend while staying fully local.
- TanStack Query owns server-like data fetching and caching for apps and app graphs.
- Zustand stores only UI state: selected app, selected node, mobile panel state, and active inspector tab.
- ReactFlow owns graph rendering and local node updates after a graph is loaded.
- Components are split by responsibility across layout, canvas, node rendering, inspector, forms, data hooks, store, mocks, and reusable UI primitives.

## Known Limitations

- Mock data is in memory and resets on refresh.
- Inspector edits are local to the currently rendered graph and are not persisted back to the mock API.
- The simulated graph error is random for one mock app to demonstrate the error state.
- The project is frontend-only and has no real backend or authentication.
