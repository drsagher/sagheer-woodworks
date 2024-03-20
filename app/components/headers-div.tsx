import Logout from "@/app/logout";
import Link from "next/link";
import React from "react";
import {getServerSession} from "next-auth";

export default async function HeadersDiv(){
    const session = await  getServerSession();

    return(
        <div className="flex bg-amber-800 h-16 items-center justify-between pl-6 pr-6">
            <h1 className="text-xl font-bold text-white">Sagheer Wood Works, Pakpattan</h1>

                <nav>
                    {
                        !!session && <Logout/>
                    }
                    {
                        !session && <Link href="http://localhost:3000/login"
                                          className="font-bold text-md text-amber-200">Login</Link>
                    }
                </nav>



        </div>
    )
}