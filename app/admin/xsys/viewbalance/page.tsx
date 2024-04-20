'use client'
import React, {useEffect, useState} from "react";

export default function ViewBalance(){
    const [listData, setListData] = useState([]);
    useEffect(() => {
        fetch('/api/auth/xviewbalance',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);
    return(
        <div className="flex flex-col bg-gray-100  px-4">
            <table className="table-auto border-slate-400 border-spacing-2 ">
                <caption className="caption-top text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800 mb-2">
                    All Clients Balance Sheet
                </caption>
                <thead className="bg-black text-white">
                <tr>
                    <th className="border border-slate-300 p-2 ">CLIENT ID</th>
                    <th className="border border-slate-300 p-2 ">CLIENT NAME</th>
                    <th className="border border-slate-300 p-2 ">PENDING</th>
                    <th className="border border-slate-300 p-2 ">RECEIVED</th>
                    <th className="border border-slate-300 p-2 ">BALANCE</th>
                </tr>
                </thead>
                <tbody>
                {
                    listData && listData.map(({clientid, client, name, bill,amount,balance}) => (
                        <tr key={clientid}
                            className="odd:bg-gray-100 odd:text-blue-700 text-center even:text-gray-700 hover:bg-gray-200">
                            <td className="border border-slate-300 p-2 ">{clientid}</td>
                            <td className="border border-slate-300 p-2 ">{client} </td>
                            <td className="border border-slate-300 p-2 ">{bill}</td>
                            <td className="border border-slate-300 p-2 ">{amount}</td>
                            <td className="border border-slate-300 p-2 ">{balance}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}