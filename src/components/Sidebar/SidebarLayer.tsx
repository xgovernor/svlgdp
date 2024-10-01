"use client";

import { memo } from "react";
import AppSidebar from "./AppSidebar";
import React from "react";
import { useMap } from "@/store/map";
import { cn } from "@/lib/utils";


export interface ISidebarLayer {
    open: boolean
    toggleDrawer: () => void
}

const SidebarLayer = memo(({ open = true, toggleDrawer }: ISidebarLayer) => {
    const { layers, layer, toggleLayer, overlays, overlay, toggleOverlay } = useMap();

    return (
        <AppSidebar
            title="Layers"
            toggleDrawer={toggleDrawer}
            open={open}
        >
            <div className="space-y-5">
                <div className="space-y-2">
                    <h2 className="text-sm font-medium">Maps</h2>

                    <div className="w-full grid grid-cols-3 gap-3">
                        {layers.map((item, i) => (
                            <button key={i} className="space-y-2 text-center overflow-hidden" onClick={() => toggleLayer(item)}>
                                <div className={cn("w-full h-16 card border border-black rounded", item.url === layer.url ? 'bg-primary border-[#2F9C3C]' : '')}
                                >
                                </div>
                                <p className="text-xs">{item.name}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-sm font-medium">Datasets</h2>
                    <div className="w-full grid grid-cols-3 gap-3">
                        {overlays.map((item, i) => (
                            <button key={i} className={cn("space-y-2 text-center overflow-hidden",)} onClick={() => toggleOverlay(item)}>
                                <div className={cn("w-full h-16 card border border-black rounded", overlay.some((activeItem) => activeItem.url === item.url) ? 'bg-primary border-[#2F9C3C]' : '')}
                                >
                                </div>
                                <p className="text-xs">{item.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </AppSidebar>
    )
});

SidebarLayer.displayName = 'ProjectSidebarLayer';

export default memo(SidebarLayer)
