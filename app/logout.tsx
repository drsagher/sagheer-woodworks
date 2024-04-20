'use client'
import {signOut} from "next-auth/react";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function Logout(){
    return(
        <span className="text-amber-200 font-bold hover:text-slate-50"
              onClick={()=>{
            signOut();
        }}>
            <RiLogoutCircleLine size={25}/>
        </span>
    )
}