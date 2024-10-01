import { create } from "zustand";

export type ILayoutDrawers =
  | "drawerLayer"
  | "drawerHelp"
  | "drawerNote"
  | "drawerNewNote";

export interface LayoutState {
  theme: string;
  setTheme: () => void;
  sidebar: false | ILayoutDrawers;
  toggleSidebar: (sidebar?: ILayoutDrawers) => void;
}

export const useLayout = create<LayoutState>((set) => ({
  theme: "dark",
  setTheme: () =>
    set((state: { theme: string }) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  sidebar: false,
  toggleSidebar: (sidebar) => set({ sidebar: sidebar ?? false }),
}));
