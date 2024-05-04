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

export default function AdminLayout({ children }: { children: ReactNode }) {
    return(
        <div className="flex">
            <div className="flex flex-col w-2/12 p-4 text-lg bg-indigo-900">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="flex text-white">
                            Admin</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col text-white">
                                <Link className="flex items-center gap-1 hover:underline hover:text-amber-200"
                                      href="/admin"><TiHomeOutline />

                                    Home</Link>
                                <Link className="flex items-center gap-1 hover:underline hover:text-amber-200"
                                      href="/admin/ysys/register"><FaUserPlus />
                                    Register
                                    User</Link>
                                <Link className="flex items-center gap-1 hover:underline hover:text-amber-200"
                                      href="/admin/ysys/changepassword"><GrUserAdmin />Change Password</Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-white">Ledger</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col text-white">
                                {/*<Link className="hover:underline hover:text-amber-200"*/}
                                {/*      href="/admin/xsys">Home X</Link>*/}
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/xsys/viewbalance"><LiaBalanceScaleSolid />
                                    Balance</Link>
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/xsys/viewclient"><MdOutlinePersonSearch />
                                    Clientage</Link>
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/xsys/viewdata"><TbDatabaseDollar />
                                    Entries</Link>
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/xsys/editclient"><LiaUserEditSolid />
                                    Client</Link>

                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/xsys/xregister"><IoPersonAddOutline />
                                    Register</Link>


                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/xsys/delrecord"><MdOutlineDeleteForever />
                                    Remove</Link>

                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/xsys/statusclient"><TbUserQuestion />
                                    Status</Link>

                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-white">Wood</AccordionTrigger>
                        <AccordionContent>
                            <nav
                                 className="flex flex-col text-white ">
                                {/*<Link className="hover:underline hover:text-amber-200"*/}
                                {/*      href="/admin/ysys">Home Y</Link>*/}
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/ysys/viewbalance"><LiaBalanceScaleSolid />Balance</Link>
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/ysys/viewclient"><MdOutlinePersonSearch />Clientage</Link>
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/ysys/viewdata"><TbDatabaseDollar />Entries</Link>
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/ysys/editclient"><LiaUserEditSolid />
                                    Client</Link>
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/ysys/clientregisteration"><IoPersonAddOutline />Register</Link>
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/ysys/delrecord"><MdOutlineDeleteForever />Remove</Link>
                                <Link className="hover:underline hover:text-amber-200 flex items-center gap-1"
                                      href="/admin/ysys/statusclient"><TbUserQuestion />Status</Link>
                            </nav>
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