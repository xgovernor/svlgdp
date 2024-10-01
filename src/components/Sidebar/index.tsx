"use client"

import ToolBox from "./Toolbox"
import { useLayout } from "@/store/layout"
import SidebarHelp from "./SidebarHelp";
import SidebarNote from "./SidebarNote";
import SidebarLayer from "./SidebarLayer";
import SidebarNewNote from "./SidebarNewNote";

export default function Sidebar(): JSX.Element {
    const { sidebar, toggleSidebar } = useLayout();

    return (
        <div className="flex h-[calc(100vh-45px)] bg-[#1e2024]">
            <ToolBox activeMenu={sidebar} onIconClick={toggleSidebar} />

            <SidebarLayer open={sidebar === "drawerLayer"} toggleDrawer={toggleSidebar} />
            <SidebarNote open={sidebar === "drawerNote"} toggleDrawer={toggleSidebar} />
            <SidebarNewNote open={sidebar === "drawerNewNote"} toggleDrawer={toggleSidebar} />
            <SidebarHelp open={sidebar === "drawerHelp"} toggleDrawer={toggleSidebar} />
        </div>
    )
}
