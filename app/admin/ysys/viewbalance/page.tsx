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
        <div className="flex flex-col items-center">
            <p className="font-bold text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
                Wood Client Balance Sheet - Balance:({balanceX && balanceX?.map(c => c["balance"])})</p>
            <div className="flex flex-col overflow-auto">
                <DataTable columns={columns} data={listData}/>
            </div>
        </div>
    )
}