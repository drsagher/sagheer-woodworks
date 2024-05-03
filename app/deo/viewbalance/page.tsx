'use client'
import React, {useEffect, useState} from "react";
import {DataTable} from "@/app/admin/ysys/viewbalance/data-table";
import {columns} from "@/app/admin/ysys/viewbalance/columns";

export default function ViewBalance(){
    const [listData, setListData] = useState([]);
    // const [balanceX, setBalanceX] = useState([]);


    useEffect(() => {
        fetch('/api/auth/viewbalance',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);

    // useEffect( () => {
    //     fetch('/api/auth/woodbalance',{next:{revalidate:1}, method: 'PUT'})
    //         .then((res) => res.json())
    //         .then((balanceX) => {
    //             setBalanceX(balanceX)
    //         })
    // }, []);

    return (
        <div className="flex flex-col overflow-auto">
            <DataTable columns={columns} data={listData}/>
        </div>
    )
}