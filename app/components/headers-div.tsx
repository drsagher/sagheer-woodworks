import Logout from "@/app/logout";
import Link from "next/link";
import React from "react";
import {getServerSession} from "next-auth";
import { RiLoginCircleLine } from "react-icons/ri";

export default async function HeadersDiv(){
    const session = await  getServerSession();
    const user = session?.user;

    return(
        <div className="flex bg-red-700 h-16 items-center justify-between pl-2 md:pl-6 pr-6">
            <h1 className="text-md font-bold text-amber-200 uppercase">Sagheer Shop, Pakpattan</h1>
                <nav >
                    { !!session &&  <div className="flex text-white gap-2"> { user?.email } <Logout/> </div> }
                    {
                        !session && <Link href="/public" className="text-sm text-amber-200 hover:text-slate-50"><RiLoginCircleLine size={25}/> </Link>
                    }
                </nav>
        </div>
    )
}