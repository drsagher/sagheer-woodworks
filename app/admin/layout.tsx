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
            <div >
                <button onClick={toggleMenu} className="text-green-800"><CgMenuGridO size={40}/></button>
                {isVisible && (
                    <nav onClick={()=>setIsVisible(!isVisible)} className="flex flex-col items-center justify-center gap-2 text-center bg-green-800">
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin">Home</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/viewclient">View
                            Client Record</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/viewdata">View
                            All Entries</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/editclient">Update
                            Client</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/clientregisteration">Register Client</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/register">Register
                            User</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/changepassword">Change Password</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/delrecord">Delete Record</Link>
                    </nav>
                )}
            </div >
            {children}
        </div>
    )
}