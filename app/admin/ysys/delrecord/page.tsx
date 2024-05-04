'use client'
import React, {useCallback, useEffect, useState} from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoMdWarning } from "react-icons/io";

export default function DelRecord(){
    const [entryId, setEntryId] = useState(0);
    const [clientId, setClientId] = useState(0);
    const [userId, setUserId] = useState(0);

    const entryIDHandler = (e:React.ChangeEvent<any>) => {
        setEntryId(e.target.value);
    }
    const clientIDHandler = (e:React.ChangeEvent<any>) => {
        setClientId(e.target.value);
    }
    const userIDHandler = (e:React.ChangeEvent<any>) => {
        setUserId(e.target.value);
    }

    // Delete Entry
    const delEntryUrl =`/api/auth/delentry?id=${entryId}`;
    const delClientUrl =`/api/auth/delrecord?id=${clientId}`;
    const delUserUrl =`/api/auth/deluser?id=${userId}`;

    const delEntry = async (url:string) => {
        const response = await fetch(url,{next:{revalidate:1}, method: 'DELETE'});
        if(response.ok){
            alert("Entry Deleted Successfully");
        }
    }

    // Delete Client
    const delClient = async (url:string) => {
        const response = await fetch(url,{next:{revalidate:1}, method: 'DELETE'});
        if(response.ok){
            alert("Client Deleted Successfully");
        }
    }

    // Delete Users
    const delUser = async (url:string) => {
        const response = await fetch(url,{next:{revalidate:1}, method: 'DELETE'});
        if(response.ok){
            alert("User Deleted Successfully");
        }
    }

    return(
        <div className="flex flex-col gap-6 items-center w-full">
            <div className="flex text-red-600 font-bold uppercase"><IoMdWarning size={35}/>DELETE WOOD RECORD</div>

            <div className="flex items-center gap-2 p-2 w-full justify-center border-2">
                <label className="font-bold text-red-700">Delete Entry</label>
                <input onChange={entryIDHandler}
                       className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                       type="text" placeholder="Type entry id here ..."/>
                <button className="text-red-700" onClick={()=>delEntry(delEntryUrl)}><MdDeleteForever size={40}/></button>
            </div>

            <div className="flex items-center gap-2 p-2 w-full justify-center border-2">
                <label className="font-bold text-red-700">Delete Client</label>
                {/*{clientId}*/}
                <input onChange={clientIDHandler}
                       className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                       type="text" placeholder="Type Client id here ..."/>
                <button className="text-red-800" onClick={()=>delClient(delClientUrl)}><MdDeleteForever size={40}/></button>
            </div>

            <div className="flex items-center gap-2 p-2 w-full justify-center border-2">
                <label className="font-bold text-red-700">Delete User</label>
                {/*{userId}*/}
                <input onChange={userIDHandler}
                       className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                       type="text" placeholder="Type user id"/>
                <button className="text-red-700" onClick={()=>delUser(delUserUrl)}><MdDeleteForever size={40}/></button>
            </div>

        </div>
    )
}