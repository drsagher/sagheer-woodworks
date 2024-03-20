'use client'
import {signOut} from "next-auth/react";

export default function Logout(){
    return(
        <span className="text-green-400 font-bold text-md"
              onClick={()=>{
            signOut();
        }}>
            Logout
        </span>
    )
}