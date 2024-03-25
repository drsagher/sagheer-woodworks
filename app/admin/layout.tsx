import {ReactNode} from "react";
import Link from "next/link";
export default function AdminLayout({ children }: { children: ReactNode }) {
    return(
        <div>
            <nav className=" flex items-center justify-center bg-amber-200 h-10 gap-2">
                <Link className="h-10 p-2 hover:bg-amber-400 font-bold text-green-800" href="/admin">Home</Link>
                <Link className="h-10 p-2 hover:bg-amber-400 font-bold text-green-800" href="/admin/clientregisteration">Register Client</Link>
                <Link className="h-10 p-2 hover:bg-amber-400 font-bold text-green-800" href="/admin/register">Register User</Link>
            </nav>
            {children}
        </div>
    )
}