'use client'
import {useEffect, useState} from "react";
import React from "react";
import {DataTable} from "@/app/components/data-table";
import { columns } from './columns';

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
    return (
        <div className="flex flex-col items-center">
            <p className="font-bold text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
                List of Clients- Active Wood Clients ({ totalClients&& totalClients?.map(c=>c["regclients"])})</p>
        <div className="flex flex-col overflow-auto">
            <DataTable columns={columns} data={listData}/>
        </div>
        </div>
    )
}