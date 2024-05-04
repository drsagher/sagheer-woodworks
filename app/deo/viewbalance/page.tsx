'use client'
import {useEffect, useState} from "react";
import {DataTable} from "@/app/components/data-table";
import { columns } from './columns';

export default function ViewBalance(){
    const [listData, setListData] = useState([]);
    const [balanceX, setBalanceX] = useState([]);

    useEffect(() => {
        fetch('/api/auth/viewbalance',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);
    useEffect( () => {
        fetch('/api/auth/woodbalance',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((balanceX) => {
                setBalanceX(balanceX)
            })
    }, []);
    return (
        <div className="flex flex-col overflow-auto min-h-screen">
            <p className="font-bold text-xl uppercase mt-4 text-center text-red-700">
                Wood Client Balance Sheet - Balance:({balanceX && balanceX.map(c => c["balance"])})</p>
                <DataTable columns={columns} data={listData}/>
        </div>
    )
}