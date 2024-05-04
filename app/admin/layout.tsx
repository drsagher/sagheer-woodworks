'use client'
import {ReactNode, useState} from "react";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"
import { GrUserAdmin } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa6";
import { TiHomeOutline } from "react-icons/ti";
import { IoPersonAddOutline } from "react-icons/io5";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { MdOutlinePersonSearch } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { TbDatabaseDollar } from "react-icons/tb";
import { LiaUserEditSolid } from "react-icons/lia";
import { usePathname } from 'next/navigation';
import {link} from "node:fs";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const NavLinks =[
        {id:1, name:"Home", path:"/admin", icon:<TiHomeOutline />},
        {id:2, name:"Register", path:"/admin/ysys/register", icon:<FaUserPlus />},
        {id:3, name:"Password", path:"/admin/ysys/changepassword", icon:<GrUserAdmin />},
    ]

    const NavLinksX =[
        {id:1, name:"Balance", path:"/admin/xsys/viewbalance", icon:<LiaBalanceScaleSolid />},
        {id:2, name:"Clientage", path:"/admin/xsys/viewclient", icon:<MdOutlinePersonSearch />},
        {id:3, name:"Entries", path:"/admin/xsys/viewdata", icon:<TbDatabaseDollar />},
        {id:4, name:"Client", path:"/admin/xsys/editclient", icon:<LiaUserEditSolid />},
        {id:5, name:"Register", path:"/admin/xsys/xregister", icon:<IoPersonAddOutline />},
        {id:6, name:"Remove", path:"/admin/xsys/delrecord", icon:<MdOutlineDeleteForever />},
        {id:7, name:"Status", path:"/admin/xsys/statusclient", icon:<TbUserQuestion />},
    ]

    const NavLinksY =[
        {id:1, name:"Balance", path:"/admin/ysys/viewbalance", icon:<LiaBalanceScaleSolid />},
        {id:2, name:"Clientage", path:"/admin/ysys/viewclient", icon:<MdOutlinePersonSearch />},
        {id:3, name:"Entries", path:"/admin/ysys/viewdata", icon:<TbDatabaseDollar />},
        {id:4, name:"Client", path:"/admin/ysys/editclient", icon:<LiaUserEditSolid />},
        {id:5, name:"Register", path:"/admin/ysys/xregister", icon:<IoPersonAddOutline />},
        {id:6, name:"Remove", path:"/admin/ysys/delrecord", icon:<MdOutlineDeleteForever />},
        {id:7, name:"Status", path:"/admin/ysys/statusclient", icon:<TbUserQuestion />},
    ]

    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;
    return(
        <div className="flex">
            <div className="flex flex-col w-2/12 p-4 text-lg bg-indigo-900">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="flex text-white">
                            Admin</AccordionTrigger>
                        <AccordionContent>
                            {/*New Links*/}

                            {NavLinks.map((link) => {
                                return (
                                        <Link key={link.id}
                                            href={link.path}
                                            className={`${isActive(link.path) ? 'text-amber-200 font-bold' : 'text-white'} flex items-center gap-1 hover:underline hover:text-amber-200`}
                                        >
                                            {link.icon} {link.name}
                                        </Link>
                                );
                            })}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-white">Ledger</AccordionTrigger>
                        <AccordionContent>
                            {NavLinksX.map((link) => {
                                return (
                                    <Link key={link.id}
                                          href={link.path}
                                          className={`${isActive(link.path) ? 'text-amber-200 font-bold' : 'text-white'} flex items-center gap-1 hover:underline hover:text-amber-200`}
                                    >
                                        {link.icon} {link.name}
                                    </Link>
                                );
                            })}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-white">Wood</AccordionTrigger>
                        <AccordionContent>
                            {NavLinksY.map((link) => {
                                return (
                                    <Link key={link.id}
                                          href={link.path}
                                          className={`${isActive(link.path) ? 'text-amber-200 font-bold' : 'text-white'} flex items-center gap-1 hover:underline hover:text-amber-200`}
                                    >
                                        {link.icon} {link.name}
                                    </Link>
                                );
                            })}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="flex w-10/12 min-h-screen items-center justify-center bg-white">
                {children}
            </div>
        </div>
    )
}