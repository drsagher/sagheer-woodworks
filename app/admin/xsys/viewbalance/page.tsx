'use client'
import React, {useEffect, useState} from "react";

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

    return(

            <table className="table-auto text-md text-left ">
                <caption className="text-lg font-bold text-green-900 uppercase p-4">
                    Ledger Balance Sheet ({balanceX && balanceX.map(c => c["balance"])})
                </caption>
                <thead className="bg-indigo-950 text-amber-200">
                <tr>
                    <th className="">ID</th>
                    <th className="">NAME</th>
                    <th className="">PENDING</th>
                    <th className="">RECEIVED</th>
                    <th className="">BALANCE</th>
                </tr>
                </thead>
                <tbody>
                {
                    listData && listData.map(({clientid, client, name, bill, amount, balance}) => (
                        <tr key={clientid}
                            className="odd:bg-black odd:text-white uppercase">
                            <td className="">{clientid}</td>
                            <td className="">{client} </td>
                            <td className="">{bill}</td>
                            <td className="">{amount}</td>
                            <td className="">{balance}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

    )
}