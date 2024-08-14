'use client'
import {useEffect, useState} from "react";
import React from "react";
import { revalidatePath } from 'next/cache'
import {DataTable} from "@/app/components/data-table";
import {columns} from "@/app/admin/ysys/viewclient/columns";

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
    return (
        <div className="flex flex-col items-center">
            <p className="font-bold text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
                List of Clients - Active Ledger Client ({ totalClients&& totalClients?.map(c=>c["regclients"])})</p>
            <div className="flex flex-col overflow-auto">
                <DataTable columns={columns} data={listData}/>
            </div>
        </div>
    )
}