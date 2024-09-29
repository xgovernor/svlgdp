import React, { memo } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CircleUser } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'


const ProfileMenu = () => {
    const { data } = useSession();

    return data ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="hover:text-[#fffff5db] hover:bg-[#161618]" variant="ghost" size="icon">
                    {data?.user?.image ?
                        <Image
                            className="h-7 w-7 rounded-full" alt={data?.user?.name || ""}
                            src={data?.user?.image}
                            width={28}
                            height={28}
                        /> :
                        <CircleUser className="h-4 w-4" />}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel> Account </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => { }}>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Bookmarks</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Link
            className="hover:text-[#fffff5db] hover:bg-[#161618]"
            href="/auth/signin"
        >
            <CircleUser className="h-6 w-6" strokeWidth={1.5} />
        </Link>
    );
}

export default memo(ProfileMenu);
