'use client'
import React, {useEffect, useState} from "react";
import {DataTable} from "@/app/components/data-table";
import {columns} from "@/app/admin/ysys/viewbalance/columns";

export default function ViewBalance(){
    const [listData, setListData] = useState([]);
    const [balanceX, setBalanceX] = useState([]);

    useEffect(() => {
        fetch('/api/auth/xviewbalance',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);

    useEffect( () => {
        fetch('/api/auth/ledgerbalance',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((balanceX) => {
                setBalanceX(balanceX)
            })
    }, []);
    // ({balanceX && balanceX.map(c => c["balance"])})
    return (

        <div className="flex flex-col items-center">
            <p className="font-bold text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
                Ledger Client Balance Sheet -Balance: ({balanceX && balanceX.map(c => c["balance"])})</p>
            <div className="flex flex-col overflow-auto">
                <DataTable columns={columns} data={listData}/>
            </div>
        </div>
    )
}