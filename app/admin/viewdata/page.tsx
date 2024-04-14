'use client'
import {useCallback, useEffect, useState} from "react";
import React from "react";

export default function Page(){
    const [listData, setListData] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [id, setId] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [allList, setAllList] = useState([]);
    let listUrl = "/api/auth/viewclient";
    let allListUrl = "/api/auth/viewdata";
    let byClientUrl = `/api/auth/filters/byclientid?clientid=${id}`;
    let byDatesUrl = `/api/auth/filters/bydates?fromDate=${fromDate}&toDate=${toDate}`;


    // Show all data
    const fetchAllData = useCallback(async (url:string) => {
        try {
            const response = await fetch(url,{next:{revalidate:1}, method: 'PUT'});
            const data = await response.json();
            // console.log(data);
            setAllList(data);
        } catch (error) {
            console.log(error);
        }
    }, [setAllList]);

    useEffect(() => {
        fetchAllData(allListUrl);
    }, [fetchAllData, allListUrl]);

    const ShowAllData = async ()=>{
        setListData(allList);
    }


    const fetchListData = useCallback(async (url:string) => {
        try {
            const response = await fetch(url,{next:{revalidate:1}, method: 'PUT'});
            const data = await response.json();
            // console.log(data);
            setClientList(data);
        } catch (error) {
            console.log(error);
        }
    }, [setClientList]);

    useEffect(() => {
        fetchListData(listUrl);
    }, [fetchListData, listUrl]);

    // Filter by Client ID
    const fetchByClientData = useCallback(async (url:string) => {
        try {
            const response = await fetch(url,{next:{revalidate:1}, method: 'GET'});
            const data = await response.json();
            // console.log(data);
            setListData(data);
        } catch (error) {
            console.log(error);
        }
    }, [setListData]);
  useEffect(() => {
        fetchByClientData(byClientUrl);
    }, [fetchByClientData, byClientUrl]);


    const eventHandler = (e:React.ChangeEvent<any>) => {
        setId(e.target.value);
    }

    // Filter by Dates from date - to date
    const fetchByDatesData = useCallback(async (url:string) => {
        try {
            const response = await fetch(url,{next:{revalidate:1}, method: 'GET'});
            const data = await response.json();
            // console.log(data);
            setListData(data);
        } catch (error) {
            console.log(error);
        }
    }, [setListData]);
    useEffect(() => {
        fetchByDatesData(byDatesUrl);
    }, [fetchByDatesData, byDatesUrl]);

    const fromDateEventHandler = (e:React.ChangeEvent<any>) => {
        setFromDate(e.target.value);
    }
    const toDateEventHandler = (e:React.ChangeEvent<any>) => {
        setToDate(e.target.value);
    }
    return(
    <div className="flex flex-col items-center justify-center bg-gray-100 py-4 ">
        <div className="flex flex-col p-2 rounded-xl gap-4">
            {/* Filter Record By Client */}
            <div className="flex items-center justify-between gap-4 bg-gray-200 p-1 rounded-xl">
                <label className="font-bold">By Name: </label>
                <select onClick={eventHandler}
                        className="border-2 border-rose-600 h-10 rounded-xl pl-2 active:border-amber-400">
                    {
                        clientList ?
                            clientList.map((client) => {
                                return <option key={client["id"]}
                                               value={client["id"]}>{client["id"]} {client["name"]}</option>
                            }) : null
                    }
                </select>
            </div>

            <div className="flex bg-gray-200 rounded-xl p-1">
                {/*  Filter by Dates  */}
                <div>
                    <label className="font-bold">From: </label>
                    <input name="fromDate" type="date" onChange={fromDateEventHandler}
                           className="border-2 border-rose-600 h-10 rounded-xl pl-2 active:border-amber-400"/>
                </div>
                <div>
                    <label className="font-bold">To: </label>
                    <input name="toDate"
                           type="date" onChange={toDateEventHandler}
                           className="border-2 border-rose-600 h-10 rounded-xl pl-2 active:border-amber-400"/>
                </div>
            </div>
            <div>
                <button onClick={ShowAllData}
                className="bg-gray-200 rounded-xl px-2 text-sm hover:bg-green-300"
                >Show All Data</button>
            </div>
        </div>
        <table className="table-auto border-slate-400 border-spacing-1">
            <caption className="caption-top text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800 mb-2">
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
                <th className="border border-slate-300 p-2 ">CLIENT ID</th>
                <th className="border border-slate-300 p-2 ">MESSAGE</th>
                <th className="border border-slate-300 p-2 ">BY</th>
            </tr>
            </thead>
            <tbody>
            {
                listData && listData.map((item, index) => (
                    <tr key={index} className="odd:bg-gray-200 odd:text-blue-700 text-center even:text-gray-700 hover:bg-green-200">
                        <td className="border border-slate-300 p-2 ">{item["id"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["client"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["date"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["desription"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["muns"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["kg"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["price"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["bill"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["amount"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["clientid"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["message"]}</td>
                        <td className="border border-slate-300 p-2 ">{item["by"]}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    )
}