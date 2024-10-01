import { XIcon } from 'lucide-react';
import React from 'react'
import { ScrollArea } from '../ui/scroll-area';


interface AppSidebar {
    children: React.ReactNode;
    title: string;
    icon?: JSX.Element;
    open: boolean;
    toggleDrawer: (sidebar: false) => void;
}

export default function AppSidebar({
    children,
    title,
    open,
    toggleDrawer
}: AppSidebar): JSX.Element {
    return (
        <div
            className={`w-[380px] py-4 text-gray-300 space-y-4 flex flex-col bg-[#1B1B1F] border-e border-e-black transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full hidden'}`}
        >
            <div className="px-4 flex justify-between items-center">
                <h2 className="text-base font-semibold">{title}</h2>
                <button onClick={() => toggleDrawer(false)} className="text-gray-400 hover:text-gray-200">
                    <XIcon size={18} />
                </button>
            </div>

            <ScrollArea className="px-4">
                {children}
            </ScrollArea>
        </div>
    )
}
