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

        <div className="flex flex-col overflow-auto min-h-screen">
            <p className="font-bold text-xl uppercase mt-4 text-center text-red-700">
                Ledger Client Balance Sheet -Balance: ({balanceX && balanceX.map(c => c["balance"])})</p>
                <DataTable columns={columns} data={listData}/>
        </div>
    )
}