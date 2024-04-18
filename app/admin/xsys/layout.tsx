'use client'
import {ReactNode, useState} from "react";
import Link from "next/link";
import { CgMenuGridO } from "react-icons/cg";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleMenu = () => {
        setIsVisible(!isVisible);
    }
    return(
        <div>
            <div className="flex flex-col items-center justify-center">
                <button onClick={toggleMenu} className="text-green-800"><CgMenuGridO size={40}/></button>
                {isVisible && (
                    <nav onClick={()=>setIsVisible(!isVisible)} className="flex flex-col items-center justify-center gap-2 text-center bg-green-800">
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/xsys">Home X</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/xsys/xregister">Register X</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/xsys/viewbalance">Balance X</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/xsys/viewclient">View Client Record X</Link>

                    </nav>
                )}
            </div >
            {children}
        </div>
    )
}