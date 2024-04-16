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
                              href="/admin/ysys">Home Y</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/ysys/viewbalance">View Balance</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/ysys/viewclient">View
                            Client Record</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/ysys/viewdata">View
                            All Entries</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/ysys/editclient">Update
                            Client</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/ysys/clientregisteration">Register Client</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/ysys/register">Register
                            User</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/ysys/changepassword">Change Password</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/ysys/delrecord">Delete Record</Link>
                        <Link className="text-md w-full h-10 p-2 hover:bg-amber-400 text-white"
                              href="/admin/ysys/statusclient">Client Status</Link>

                    </nav>
                )}
            </div >
            {children}
        </div>
    )
}