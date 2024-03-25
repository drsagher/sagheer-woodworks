import {ReactNode} from "react";
import Link from "next/link";
export default function AdminLayout({ children }: { children: ReactNode }) {
    return(
        <div>
            <nav className=" flex items-center justify-center text-center bg-amber-200 h-10">
                <p className="w-1/2 font-bold text-amber-700">Data Entry Dashboard</p>
                <div className="flex gap-2 w-1/2">
                    <Link className="h-10 p-2 hover:bg-amber-400 font-bold text-green-800" href="/deo/entryform">Entry</Link>
                    <Link className="h-10 p-2 hover:bg-amber-400 font-bold text-green-800" href="/deo/balance">Check Balance</Link>
                    <Link className="h-10 p-2 hover:bg-amber-400 font-bold text-green-800" href="/deo">Dashboard</Link>
                </div>
                </nav>
            {children}
        </div>
    )
}