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
    let listUrl = "/api/auth/xviewclient";
    let allListUrl = "/api/auth/xviewdata";
    let byClientUrl = `/api/auth/xfilters/byclientid?clientid=${id}`;
    let byDatesUrl = `/api/auth/xfilters/bydates?fromDate=${fromDate}&toDate=${toDate}`;


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
        <div className="flex flex-col bg-gray-100 p-2 ">
            <div className="flex p-2 rounded-xl gap-2 items-center justify-center">
                {/* Filter Record By Client */}
                <div className="flex items-center justify-between rounded-xl">
                    {/*<label className="p-2 text-slate-500 font-bold uppercase">By Name: </label>*/}
                    <select onClick={eventHandler}
                            className="h-10 rounded-md text-slate-500 pl-2 border border-slate-800 active:border-slate-800">
                        {
                            clientList ?
                                clientList.map((client) => {
                                    return <option key={client["id"]}
                                                   value={client["id"]}>{client["id"]} {client["name"]}</option>
                                }) : null
                        }
                    </select>
                </div>

                <div className="flex rounded-xl p-1">
                    {/*  Filter by Dates  */}
                    <div className="flex px-4">
                        {/*<label className="p-2 text-slate-500 font-bold uppercase">From: </label>*/}
                        <input name="fromDate" type="date" onChange={fromDateEventHandler}
                               className="h-10 rounded-md text-slate-500 pl-2 border border-slate-800 active:border-slate-800"/>
                    </div>
                    <div className="flex">
                        {/*<label className="p-2 text-slate-500 font-bold uppercase">To: </label>*/}
                        <input name="toDate"
                               type="date" onChange={toDateEventHandler}
                               className="h-10 rounded-md text-slate-500 pl-2 border border-slate-800 active:border-slate-800"/>
                    </div>
                </div>
                <div>
                    <button onClick={ShowAllData}
                            className="h-10 text-slate-500 bg-white hover:bg-slate-50 p-1 w-24 rounded-md uppercase"
                    >Show All
                    </button>
                </div>
            </div>
            <div className="flex flex-col overflow-auto px-6">

                <table className="table-auto bg-slate-100 overflow-auto w-full">
                    <caption className="p-2 text-slate-500 font-bold uppercase">
                        All Client Entries Record


                    </caption>
                    <thead className="bg-slate-200 text-md">
                    <tr >
                        <th className="p-2 text-slate-500 font-bold uppercase">ID</th>
                        <th className="p-2 text-slate-500 font-bold uppercase">CLIENT</th>
                        <th className="p-2 text-slate-500 font-bold uppercase">DESCRIPTION</th>
                        <th className="p-2 text-slate-500 font-bold uppercase">BILL</th>
                        <th className="p-2 text-slate-500 font-bold uppercase">PAYMENT</th>
                        <th className="p-2 text-slate-500 font-bold uppercase">MESSAGE</th>
                        <th className="p-2 text-slate-500 font-bold uppercase">BY</th>
                        <th className="p-2 text-slate-500 font-bold uppercase">DATE</th>
                        <th className="p-2 text-slate-500 font-bold uppercase">CLIENT ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        listData && listData.map((item, index) => (
                            <tr key={index}
                                className=" text-sm odd:bg-gray-200 odd:text-blue-700 text-center even:text-gray-700 hover:bg-green-200 overflow-auto">
                                <td className="p-2 text-slate-500">{item["id"]}</td>
                                <td className="p-2 text-slate-500">{item["client"]}</td>
                                <td className="p-2 text-slate-500">{item["description"]}</td>
                                <td className="p-2 text-slate-500">{item["bill"]}</td>
                                <td className="p-2 text-slate-500">{item["payment"]}</td>
                                <td className="p-2 text-slate-500">{item["message"]}</td>
                                <td className="p-2 text-slate-500">{item["by"]}</td>
                                <td className="p-2 text-slate-500">{item["date"]}</td>
                                <td className="p-2 text-slate-500">{item["clientid"]}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}