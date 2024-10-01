"use client";

import { memo } from "react";
import AppSidebar from "./AppSidebar";
import React from "react";


export interface ISidebarHelp {
    open: boolean
    toggleDrawer: () => void
}

const SidebarHelp = ({ open = true, toggleDrawer }: ISidebarHelp) => {
    return (
        <AppSidebar
            title="Help"
            toggleDrawer={toggleDrawer}
            open={open}
        >
            <>
                <h2>Help</h2>
            </>
        </AppSidebar>
    )
};

SidebarHelp.displayName = 'ProjectSidebarHelp';

export default memo(SidebarHelp)


