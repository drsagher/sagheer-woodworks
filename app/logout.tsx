'use client'
import {signOut} from "next-auth/react";
export default function Logout(){
    return(
        <span className="text-amber-950 font-bold hover:text-yellow-200"
              onClick={()=>{
            signOut();
        }}>
            Logout
        </span>
    )
}