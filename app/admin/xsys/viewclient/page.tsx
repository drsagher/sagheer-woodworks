'use client'
import {useEffect, useState} from "react";
import React from "react";
import { revalidatePath } from 'next/cache'

export default  function Page(){
    const [listData, setListData] = useState([]);
    const [totalClients, setTotalClients] = useState([]);

    useEffect(() => {
        fetch('/api/auth/xviewclient',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);

    useEffect( () => {
        fetch('/api/auth/xregisteredclients',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((totalClients) => {
                setTotalClients(totalClients)
            })
    }, []);

    // @ts-ignore
    // @ts-ignore
    return(
    <div className="flex flex-col items-center justify-center bg-gray-100  py-4 ">

        <table className="table-auto bg-slate-100 overflow-auto w-full">
            <caption className="p-2 text-slate-500 font-bold uppercase">
                All Registered Clients Data - Total Active Clients are
                ({ totalClients&& totalClients.map(c=>c["regclients"])})
            </caption>
            <thead className="bg-slate-200 text-md">
            <tr>
                <th className="p-2 text-slate-500 font-bold uppercase">ID</th>
                <th className="p-2 text-slate-500 font-bold uppercase">NAME</th>
                <th className="p-2 text-slate-500 font-bold uppercase">SHOP</th>
                <th className="p-2 text-slate-500 font-bold uppercase">MOBILE</th>
                <th className="p-2 text-slate-500 font-bold uppercase">STATUS</th>
            </tr>
            </thead>
            <tbody>
            {
                listData && listData.map(({id, mobile, name, shop, status}) => (
                    <tr key={id} className="odd:bg-gray-100 odd:text-blue-700 text-center even:text-gray-700 hover:bg-gray-200">
                        <td className="p-2 text-slate-500">{id}</td>
                        <td className="p-2 text-slate-500">{name} </td>
                        <td className="p-2 text-slate-500">{shop}</td>
                        <td className="p-2 text-slate-500">{mobile}</td>
                        <td className="p-2 text-slate-500">{status}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    )
}