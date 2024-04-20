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
            <table className="table-auto bg-slate-100 overflow-auto w-full">
                <caption className="p-2 text-slate-500 font-bold uppercase">
                    Ledger Balance Sheet ({ balanceX&& balanceX.map(c=>c["balance"])})
                </caption>
                <thead className="bg-slate-200 text-md ">
                <tr>
                    <th className="p-2 text-slate-500 font-bold uppercase ">CLIENT ID</th>
                    <th className="p-2 text-slate-500 font-bold uppercase">CLIENT NAME</th>
                    <th className="p-2 text-slate-500 font-bold uppercase">PENDING</th>
                    <th className="p-2 text-slate-500 font-bold uppercase">RECEIVED</th>
                    <th className="p-2 text-slate-500 font-bold uppercase">BALANCE</th>
                </tr>
                </thead>
                <tbody>
                {
                    listData && listData.map(({clientid, client, name, bill,amount,balance}) => (
                        <tr key={clientid}
                            className="hover:bg-slate-300 text-md even:bg-slate-200">
                            <td className="p-2 text-slate-500">{clientid}</td>
                            <td className="p-2 text-slate-500">{client} </td>
                            <td className="p-2 text-slate-500">{bill}</td>
                            <td className="p-2 text-slate-500">{amount}</td>
                            <td className="p-2 text-slate-500">{balance}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
    )
}