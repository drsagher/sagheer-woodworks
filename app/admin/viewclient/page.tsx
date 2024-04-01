'use client'
import {useEffect, useState} from "react";
import React from "react";
export default function Page(){
    const [listData, setListData] = useState([]);
    useEffect(() => {
        fetch('/api/auth/viewclient')
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);
    return(
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100  ">

        <table className="table-auto border-slate-400 border-spacing-2">
            <caption className="caption-top text-xl font-bold text-amber-950">
                All Registered Clients Data
            </caption>
            <thead className="bg-black text-white">
            <tr>
                <th className="border border-slate-300 p-2 ">ID</th>
                <th className="border border-slate-300 p-2 ">NAME</th>
                <th className="border border-slate-300 p-2 ">SHOP</th>
                <th className="border border-slate-300 p-2 ">MOBILE</th>
            </tr>
            </thead>
            <tbody>
            {
                listData && listData.map((item, index) => (

                    <tr key={index} className="odd:bg-gray-100 odd:text-blue-700 text-center even:text-gray-700 hover:bg-gray-200">
                        <td className="border border-slate-300 p-2 ">{item.id}</td>
                        <td className="border border-slate-300 p-2 ">{item.name} </td>
                        <td className="border border-slate-300 p-2 ">{item.shop}</td>
                        <td className="border border-slate-300 p-2 ">{item.mobile}</td>
                    </tr>

                ))
            }
            </tbody>
        </table>
    </div>
    )
}