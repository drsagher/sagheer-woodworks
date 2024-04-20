import {ReactNode} from "react";
import Link from "next/link";
import { FaSackDollar } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return(
        <div className="flex min-h-screen">
            <nav className="flex flex-col bg-slate-600 w-2/6 ">

                <Link className="flex items-center gap-2 h-10 p-2 hover:bg-gradient-to-r from-slate-500 text-slate-300 uppercase" href="/deo">
                    <FaHome /> Home
                </Link>
                <Link className="flex items-center gap-2 h-10 p-2 hover:bg-gradient-to-r from-slate-500 text-slate-300 uppercase" href="/deo/xentry">
                    <FaWpforms />
                    X Entry
                </Link>
                <Link className="flex items-center gap-2 h-10 p-2 hover:bg-gradient-to-r from-slate-500 text-slate-300 uppercase" href="/deo/entryform">
                    <FaWpforms />
                    Y Entry
                </Link>

                <Link className="flex items-center gap-2 h-10 p-2 hover:bg-gradient-to-r from-slate-500 text-slate-300 uppercase" href="/deo/viewbalance">
                    <FaSackDollar />Balance
                </Link>
            </nav>
            <div className="flex flex-col w-5/6 min-h-screen items-center text-center justify-center bg-slate-100">
                {children}
            </div>

        </div>
    )
}