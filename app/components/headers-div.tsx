import Logout from "@/app/logout";
import Link from "next/link";
import React from "react";
import {getServerSession} from "next-auth";

export default async function HeadersDiv(){
    const session = await  getServerSession();
    const user = session?.user;

    return(
        <div className="flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-16 items-center justify-between pl-6 pr-6">
            <h1 className="text-lg font-bold text-white">Sagheer Shop, Pakpattan</h1>
                <nav>
                    { !!session &&  <div> { user?.email } || <Logout/> </div> }
                    {
                        !session && <Link href="/"
                                          className="font-bold text-md text-amber-200">Login</Link>
                    }
                </nav>
        </div>
    )
}