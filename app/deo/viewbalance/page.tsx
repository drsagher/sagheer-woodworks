'use client'
import React, {useEffect, useState} from "react";

export default function ViewBalance(){
    const [listData, setListData] = useState([]);

    useEffect(() => {
        fetch('/api/auth/viewbalance',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);

    return(
        <div className="m-2">
            <table className="table-auto text-left bg-slate-100 overflow-auto ">
                <caption className="p-2 text-slate-500 font-bold uppercase">
                    All Clients Balance Sheet
                </caption>
                <thead className="bg-slate-200 text-sm">
                <tr>
                    <th className="p-1 text-slate-500 font-bold uppercase">ID</th>
                    <th className="p-1 text-slate-500 font-bold uppercase">CLIENT</th>
                    <th className="p-1 text-slate-500 font-bold uppercase">PENDING</th>
                    <th className="p-1 text-slate-500 font-bold uppercase">RECEIVED</th>
                    <th className="p-1 text-slate-500 font-bold uppercase">BALANCE</th>
                </tr>
                </thead>
                <tbody>
                {
                    listData && listData.map(({clientid, client, name, bill, amount, balance}) => (
                        <tr key={clientid}
                            className="hover:bg-slate-300 text-sm even:bg-slate-200">
                            <td className="p-1 text-slate-500">{clientid}</td>
                            <td className="p-1 text-slate-500">{client} </td>
                            <td className="p-1 text-slate-500">{bill}</td>
                            <td className="p-1 text-slate-500">{amount}</td>
                            <td className="p-1 text-slate-500">{balance}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}