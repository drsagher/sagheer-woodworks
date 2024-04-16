'use client'
import {ReactNode, useState} from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return(
        <div>
        <nav className="flex items-center justify-center gap-2 text-center bg-red-800">
            <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                  href="/admin">Admin</Link>

            <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                  href="/admin/xsys">X Sys</Link>

            <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                  href="/admin/ysys">Y Sys</Link>
        </nav>
            {children}
        </div>
    )
}