'use client'
import {useEffect, useState} from "react";
import React from "react";
export default function Page(res:Response){
    const [listData, setListData] = useState([])
    useEffect(() => {
        fetch('/api/auth/viewdata',{next:{revalidate:10}})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);

    return(
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100  ">

        <table className="table-auto border-slate-400 border-spacing-2">
            <caption className="caption-top text-xl font-bold text-amber-950">
                All Client Entries Record
            </caption>
            <thead className="bg-black text-white">
            <tr>
                <th className="border border-slate-300 p-2 ">ID</th>
                <th className="border border-slate-300 p-2 ">CLIENT</th>
                <th className="border border-slate-300 p-2 ">DATE</th>
                <th className="border border-slate-300 p-2 ">DESCRIPTION</th>
                <th className="border border-slate-300 p-2 ">MUNS</th>
                <th className="border border-slate-300 p-2 ">KG</th>
                <th className="border border-slate-300 p-2 ">PRICE</th>
                <th className="border border-slate-300 p-2 ">BILL</th>
                <th className="border border-slate-300 p-2 ">AMOUNT</th>
            </tr>
            </thead>
            <tbody>
            {
                listData && listData.map((item, index) => (
                    <tr key={index} className="odd:bg-gray-100 odd:text-blue-700 text-center even:text-gray-700 hover:bg-gray-200">
                        <td className="border border-slate-300 p-2 ">{item["id"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["client"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["date"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["desription"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["muns"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["kg"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["price"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["bill"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["amount"]}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    )
}