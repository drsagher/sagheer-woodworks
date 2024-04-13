import {ReactNode} from "react";
import Link from "next/link";
export default function AdminLayout({ children }: { children: ReactNode }) {
    return(
        <div>
            <nav className=" flex items-center justify-center text-center bg-amber-200 h-10">
                <div className="flex gap-2 ">
                    <Link className="h-10 p-2 hover:bg-amber-400 font-bold text-green-800" href="/deo">Home</Link>
                    <Link className="h-10 p-2 hover:bg-amber-400 font-bold text-green-800" href="/deo/entryform">Entry</Link>
                    <Link className="h-10 p-2 hover:bg-amber-400 font-bold text-green-800" href="/deo/viewbalance">Check Balance</Link>
                </div>
                </nav>
            {children}
        </div>
    )
}