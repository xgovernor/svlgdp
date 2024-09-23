"use client"

import { useState } from "react"
import { Layers, Home, HelpCircle, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

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
        <div className="w-14 h-screen py-4 px-2 flex flex-col items-center bg-[#1B1B1F] text-white border-e border-e-[#343434]">
            <nav className="space-y-2 flex-grow">
                {icons.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => props.onIconClick(item.name)}
                        className={cn("p-3 text-gray-400 rounded-md", props.activeMenu === item.name && "text-white bg-black")}
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
        <div className={cn("w-[350px] h-screen text-gray-300 p-4 flex flex-col bg-[#1B1B1F] border-e border-e-[#343434]")}>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">{props.activeMenu}</h2>
                <button onClick={props.onClose} className="text-gray-400 hover:text-gray-200">
                    <X size={18} />
                </button>
            </div>
            <nav className="space-y-1 flex-grow">
                <NavItem label="Item 1" />
                <NavItem label="Item 2" hasDropdown />
                <NavItem label="Item 3" hasDropdown />
                <NavItem label="Item 4" />
                <NavItem label="Item 5" />
            </nav>
        </div>
    )
}

function NavItem({
    label,
    hasDropdown = false,
}: {
    label: string;
    hasDropdown?: boolean;
}): JSX.Element {
    return (
        <div className="flex items-center py-2 px-3 rounded hover:bg-gray-700">
            <span className="flex-grow">{label}</span>
            {hasDropdown && (
                <span className="ml-auto">
                    <ChevronRight size={18} />
                </span>
            )}
        </div>
    );
}
