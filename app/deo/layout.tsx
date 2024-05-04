'use client'
import {ReactNode} from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import {usePathname} from "next/navigation";
import { LiaBalanceScaleSolid } from "react-icons/lia";

export default function DeoLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;
    const NavLinks =[
        {id:1, name:"Home", path:"/deo", icon:<FaHome />},
        {id:2, name:"Ledger", path:"/deo/xentry", icon:<LuClipboardEdit />},
        {id:3, name:"Wood", path:"/deo/entryform", icon:<LuClipboardEdit />},
        {id:4, name:"Wood", path:"/deo/viewbalance", icon:<LiaBalanceScaleSolid />},
        {id:5, name:"Ledger", path:"/deo/xviewbalance", icon:<LiaBalanceScaleSolid />},
    ]
    return(
        <div className=" ">
            <div className="flex items-center justify-start gap-2 bg-indigo-950 p-2">
                {NavLinks.map((link) => {
                    return (
                        <Link key={link.id}
                              href={link.path}
                              className={`${isActive(link.path) ? 'text-amber-200 font-bold' : 'text-white'} flex items-center hover:underline text-amber-200 uppercase`}
                        >
                            {link.icon} {link.name}
                        </Link>
                    );
                })}
            </div>
            <div className="flex items-center justify-center">
                {children}
            </div>

        </div>
    )
}