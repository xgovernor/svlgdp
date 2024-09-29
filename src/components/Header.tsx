"use client";

import { Button } from "@/components/ui/button";
import { Info, MenuIcon, Search, SunIcon } from "lucide-react";
import Link from 'next/link';
import { Input } from "./ui/input";
import { memo } from "react";
import ProfileMenu from "./ProfileMenu";
import Image from "next/image";
import LOGO from './../../public/icons/48.png';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
];

const Header = () => {

    return (
        <header>
            <nav className="max-md:ps-2 flex items-center justify-between lg:grid lg:grid-cols-5 py-1 px-4 bg-[#1C1C1C]  border-b border-b-black">
                <div className="col-span-2 flex gap-4">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <MenuIcon className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-[#1C1C1C] border-r border-r-black">
                                <div className="flex flex-col gap-4 p-4">
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
                            </SheetContent>
                        </Sheet>

                        <Link href="/" className="text-lg font-extrabold italic flex items-center gap-2">
                            <Image className="w-7 h-7" {...LOGO} alt="SVLGDP" />
                            SVLGDP
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
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
                </div>

                {/* Search Box */}
                <div className="hidden lg:flex justify-center items-center gap-4 col-span-1">
                    <div className="w-full flex items-center bg-[#24282A] border border-black rounded-sm ring-0 outline-none shadow-none overflow-hidden">
                        <Input className="h-8 rounded-none border-none" type="search" placeholder="Search" />
                        <Button className="me-0.5 w-8 h-8 text-gray-300 hover:text-[#fffff5db] hover:bg-[#161618]" variant="ghost" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-end items-center col-span-2">
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
