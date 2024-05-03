'use client'
import {useEffect, useState} from "react";
import {DataTable} from "@/app/admin/ysys/viewbalance/data-table";
import {columns} from "@/app/admin/ysys/viewbalance/columns";

export default function ViewBalance(){
    const [listData, setListData] = useState([]);
    useEffect(() => {
        fetch('/api/auth/viewbalance',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);
    return (
        <div className="flex flex-col items-center">
            <p className="font-bold text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
                Wood Client Balance Sheet</p>
            <div className="flex flex-col overflow-auto">
                <DataTable columns={columns} data={listData}/>
            </div>
        </div>
    )
}