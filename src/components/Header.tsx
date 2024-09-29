"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Info, Layers, Menu, Search, SunIcon } from "lucide-react";
import Link from 'next/link';
import { Input } from "./ui/input";
import { memo } from "react";
import ProfileMenu from "./ProfileMenu";

const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
];

const Header = () => {

    return (
        <header>
            <nav className="flex items-center justify-between lg:grid lg:grid-cols-12 py-1 px-4 bg-[#1C1C1C]  border-b border-b-black">
                <div className="flex items-center gap-4 lg:col-start-1 lg:col-end-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="grid gap-4 py-4">
                                <Button variant="ghost" className="justify-start">
                                    <Layers className="mr-2 h-4 w-4" /> Layer 1
                                </Button>
                                <Button variant="ghost" className="justify-start">
                                    <Layers className="mr-2 h-4 w-4" /> Layer 2
                                </Button>
                                <Button variant="ghost" className="justify-start">
                                    <Layers className="mr-2 h-4 w-4" /> Layer 3
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="text-xl font-bold">
                        SVLGDP
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-4 lg:col-start-2 lg:col-end-5">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[13px] font-medium hover:underline"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Search Box */}
                <div className="hidden lg:flex justify-center items-center gap-4 lg:col-start-5 lg:col-end-9">
                    <div className="w-full flex items-center bg-[#24282A] border border-black rounded-sm ring-0 outline-none shadow-none overflow-hidden">
                        <Input className="h-8 rounded-none border-none" type="search" placeholder="Search" />
                        <Button className="me-0.5 w-8 h-8 text-gray-300 hover:text-[#fffff5db] hover:bg-[#161618]" variant="ghost" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-end items-center lg:col-start-9 lg:col-end-13">
                    <Button className="hover:text-[#fffff5db] hover:bg-[#161618]" variant="ghost" size="icon">
                        <SunIcon className="h-4 w-4" />
                    </Button>
                    <Button className="hover:text-[#fffff5db] hover:bg-[#161618]" variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                    </Button>

                    <ProfileMenu />
                </div>
            </nav>
        </header>
    )
}

export default memo(Header)
