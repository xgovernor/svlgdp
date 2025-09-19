# SVLGDP - Strategic Visualization Lab for Geographical Data and Parameters

## Architecture Overview

SVLGDP is a Next.js 14+ GIS platform for environmental data visualization using React-Leaflet, focused on forest analysis and geographical parameters. The app uses a modular architecture with Zustand state management and shadcn/ui components.

### Core Components Architecture
- **Main Layout**: `src/app/layout.tsx` uses client-side rendering with SessionProvider wrapping
- **Entry Point**: `src/app/page.tsx` renders `<GisUI />` component only
- **GIS UI**: `src/components/gis-ui.tsx` contains the main layout with `<Sidebar />` and dynamic `<GisMap />`
- **Map Component**: `src/components/GisMap/index.tsx` is the core Leaflet map with error boundaries

### State Management (Zustand Stores)
- **Map State** (`src/store/map.ts`): Handles layers, overlays, center coordinates
  - Base layers: ArcGIS World Imagery, OpenStreetMap, OpenTopoMap
  - Overlays: GeoJSON files for rainfall, emissions, storms, wildfires from `/public/data/`
  - Toggle functions for layer/overlay management
- **Layout State** (`src/store/layout.ts`): Controls sidebar drawers and theme
  - Sidebar types: `drawerLayer` | `drawerHelp` | `drawerNote` | `drawerNewNote`
- **Community State** (`src/store/community.store.ts`): Manages posts and events with MongoDB integration

### Component Patterns

#### Dynamic Imports for Map Components
```tsx
const GisMap = dynamic(() => import('./GisMap'), { ssr: false });
```
Always use `ssr: false` for Leaflet components to avoid hydration issues.

#### Sidebar Architecture
Sidebar uses a toolbox + drawer pattern:
- `src/components/Sidebar/Toolbox.tsx`: Icon-based navigation
- `src/components/Sidebar/SidebarLayer.tsx`: Layer controls
- `src/components/Sidebar/SidebarNote.tsx`: Note management
- State managed via `useLayout()` hook with drawer toggling

#### Error Boundaries
Wrap map components in `<ErrorBoundary>` from `src/components/ErrorBoundary.tsx` for graceful failure handling.

### Data Flow & File Structure
- **GeoJSON Data**: Store in `/public/data/` directory as static assets
- **Map Layers**: Configured in `src/store/map.ts` with proper attribution
- **Global Types**: Defined in `src/app/types/index.d.ts` (e.g., `INote` interface)
- **Actions**: Server actions in `src/actions/` for database operations

### Development Workflow

#### Development Commands
```bash
npm run dev --turbo  # Start with Turbo for faster rebuilds
npm run build        # Production build
npm run lint         # ESLint checking
```

#### Authentication Setup
- NextAuth 5.0 beta with GitHub provider (`src/lib/auth.ts`)
- MongoDB adapter commented out but configured for future use
- Custom pages: `/auth/signin`, `/auth/error`

#### Styling Conventions
- **Theme**: Dark mode by default with `bg-[#1B1B1F]` background
- **Components**: shadcn/ui with "new-york" style in `components.json`
- **CSS Variables**: Enabled for dynamic theming
- **Map Height**: Use `h-[calc(100vh-45px)]` to account for header

### Environment & Dependencies
- **Leaflet**: Main mapping library with `leaflet.heat` for heatmaps
- **React-Leaflet**: React bindings for Leaflet maps
- **Zustand**: Lightweight state management
- **shadcn/ui**: Component library with Radix UI primitives
- **NextAuth**: Authentication with GitHub OAuth
- **MongoDB**: Database integration (currently commented out)

### Critical Implementation Notes
- All map-related components must be client-side (`"use client"`)
- Use `memo()` for map components to prevent unnecessary re-renders
- GeoJSON layers handled via custom `GeoJsonLayer` component
- Coordinate system: Default center at `{ lat: 22.0716, lng: 89.4672 }` (Bangladesh region)
- Analysis notebooks in `/analysis-process/` for data processing workflows

### Common Patterns
- Store actions return updated state directly (no separate dispatch)
- Component props use TypeScript interfaces from global declarations
- Layer/overlay toggling uses array manipulation in Zustand stores
- Dynamic imports essential for SSR compatibility with Leaflet
