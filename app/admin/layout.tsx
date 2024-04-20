'use client'
import {ReactNode, useState} from "react";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { GrUserAdmin } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return(
        <div className="flex min-h-screen bg-slate-600">
            <div className="flex flex-col w-4/12 p-4 text-lg">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="flex text-slate-50">
                            Admin</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col text-lg gap-2 pl-2 text-slate-300">
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
                        <AccordionTrigger className="text-slate-50">Ledger</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col text-lg gap-2 pl-2 text-slate-300">
                                {/*<Link className="hover:underline hover:text-amber-200"*/}
                                {/*      href="/admin/xsys">Home X</Link>*/}
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/xsys/xregister">Register Member  </Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/xsys/viewbalance">Balance Sheet</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/xsys/viewclient">Client Record</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/xsys/delrecord">Delete Record</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/xsys/editclient">Update Client</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/xsys/statusclient">Client Status</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/xsys/viewdata">Entries</Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-slate-50">Wood</AccordionTrigger>
                        <AccordionContent>
                            <nav
                                 className="flex flex-col text-lg gap-2 pl-2 text-slate-300">
                                {/*<Link className="hover:underline hover:text-amber-200"*/}
                                {/*      href="/admin/ysys">Home Y</Link>*/}
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/ysys/viewbalance">Balance Sheet</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/ysys/viewclient">Clients</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/ysys/viewdata">Entries</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/ysys/editclient">Update Client</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/ysys/clientregisteration">Register Client</Link>

                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/ysys/delrecord">Delete Record</Link>
                                <Link className="hover:underline hover:text-amber-200"
                                      href="/admin/ysys/statusclient">Client Status</Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="flex w-8/12 min-h-screen items-center justify-center bg-slate-100">
                {children}
            </div>
        </div>
    )
}