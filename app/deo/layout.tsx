import {ReactNode} from "react";
import Link from "next/link";
import { FaSackDollar } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return(
        <div className="flex flex-col min-h-screen">
            <nav className="flex bg-slate-600 text-sm justify-between">

                <Link className="flex items-center gap-1 p-1 hover:bg-gradient-to-r from-slate-500 text-slate-300 uppercase" href="/deo">
                    <FaHome /> Home
                </Link>
                <Link className="flex items-center gap-1 p-1 hover:bg-gradient-to-r from-slate-500 text-slate-300 uppercase" href="/deo/xentry">
                    <FaWpforms />
                    Ledger Entry
                </Link>
                <Link className="flex items-center gap-1 p-1 hover:bg-gradient-to-r from-slate-500 text-slate-300 uppercase" href="/deo/entryform">
                    <FaWpforms />
                    Wood Entry
                </Link>

                <Link className="flex items-center gap-1 p-1 hover:bg-gradient-to-r from-slate-500 text-slate-300 uppercase" href="/deo/viewbalance">
                    <FaSackDollar />Wood Balance
                </Link>

                <Link className="flex items-center gap-1 p-1 hover:bg-gradient-to-r from-slate-500 text-slate-300 uppercase" href="/deo/xviewbalance">
                    <FaSackDollar />Ledger Balance
                </Link>

            </nav>
            <div className="flex flex-col min-h-screen items-center text-center justify-center bg-slate-100">
                {children}
            </div>

        </div>
    )
}