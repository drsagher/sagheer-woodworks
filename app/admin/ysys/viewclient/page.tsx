'use client'
import {useEffect, useState} from "react";
import React from "react";
import { revalidatePath } from 'next/cache'

export default  function Page(){
    const [listData, setListData] = useState([]);
    const [totalClients, setTotalClients] = useState([]);

    useEffect(() => {
        fetch('/api/auth/viewallclient',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);

    useEffect( () => {
        fetch('/api/auth/registeredclients',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((totalClients) => {
                setTotalClients(totalClients)
            })
    }, []);

    // @ts-ignore
    // @ts-ignore
    return(
    <div className="flex flex-col items-center justify-center bg-gray-100  py-4 ">

        <table className="table-auto border-slate-400 border-spacing-2">
            <caption className="caption-top text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800 mb-2">
                All Registered Clients Data - Total Active Clients are
                ({ totalClients&& totalClients.map(c=>c["regclients"])})
            </caption>
            <thead className="bg-black text-white">
            <tr>
                <th className="border border-slate-300 p-2 ">ID</th>
                <th className="border border-slate-300 p-2 ">NAME</th>
                <th className="border border-slate-300 p-2 ">SHOP</th>
                <th className="border border-slate-300 p-2 ">MOBILE</th>
                <th className="border border-slate-300 p-2 ">STATUS</th>
            </tr>
            </thead>
            <tbody>
            {
                listData && listData.map(({id, mobile, name, shop, status}) => (
                    <tr key={id} className="odd:bg-gray-100 odd:text-blue-700 text-center even:text-gray-700 hover:bg-gray-200">
                        <td className="border border-slate-300 p-2 ">{id}</td>
                        <td className="border border-slate-300 p-2 ">{name} </td>
                        <td className="border border-slate-300 p-2 ">{shop}</td>
                        <td className="border border-slate-300 p-2 ">{mobile}</td>
                        <td className="border border-slate-300 p-2 ">{status}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    )
}