"use client"

import { useState } from "react"
import { Layers, Home, HelpCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import HeatmapCard from "../HeatmapCard/page"

export default function Sidebar(): JSX.Element {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [isSecondMenuOpen, setIsSecondMenuOpen] = useState(false)

    const handleIconClick = (menuName: string): void => {
        setActiveMenu(menuName)
        setIsSecondMenuOpen(true)
    }

    const handleMenuClose = (): void => {
        setActiveMenu(null)
        setIsSecondMenuOpen(false)
    }

    return (
        <div className="flex h-screen bg-[#1e2024]">
            <IconMenu activeMenu={activeMenu} onIconClick={handleIconClick} />
            {isSecondMenuOpen && (
                <SecondMenu
                    activeMenu={activeMenu ?? ""}
                    onClose={() => handleMenuClose()}
                />
            )}
        </div>
    )
}

/**
 * Renders a menu of icons that can be clicked to open a second menu.
 *
 * @param {{ activeMenu: string | null, onIconClick: (menuName: string) => void }} props
 * @returns {JSX.Element}
 */
function IconMenu(props: {
    activeMenu: string | null;
    onIconClick: (menuName: string) => void;
}): JSX.Element {
    const icons = [
        { name: "Overview", icon: Home },
        { name: "Layers", icon: Layers },
        { name: "Help", icon: HelpCircle },
    ] as const;

    return (
        <div className="w-14 h-screen p-2 flex flex-col items-center bg-[#1B1B1F] text-white border-e border-e-black">
            <nav className="space-y-2 flex-grow">
                {icons.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => props.onIconClick(item.name)}
                        className={cn("p-3 text-gray-400 rounded-md hover:bg-[#24282A]", props.activeMenu === item.name && "text-white bg-black")}
                    >
                        <item.icon size={18} />
                    </button>
                ))}
            </nav>
        </div>
    );
}

/**
 * Renders a second menu with the given title and items.
 *
 * @param {{ activeMenu: string, onClose: () => void }} props
 * @returns {JSX.Element}
 */
function SecondMenu(props: {
    activeMenu: string;
    onClose: () => void;
}): JSX.Element {
    return (
        <div className={cn("w-[350px] h-screen text-gray-300 p-4 flex flex-col bg-[#1B1B1F] border-e border-e-black")}>
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">{props.activeMenu}</h2>
                <button onClick={props.onClose} className="text-gray-400 hover:text-gray-200">
                    <X size={18} />
                </button>
            </div>

            <div className="flex flex-wrap gap-4">
                <HeatmapCard
                    title="Temperature Heatmap"
                    info="Shows temperature distribution across the region"
                    dataType="Temperature Data"
                />
                <HeatmapCard
                    title="Population Density"
                    info="Displays population density in urban areas"
                    dataType="Demographic Data"
                />
                <HeatmapCard
                    title="Traffic Congestion"
                    info="Illustrates traffic congestion levels in the city"
                    dataType="Traffic Data"
                />
            </div>
        </div>
    )
}
