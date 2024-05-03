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
        <div className="flex flex-col overflow-auto">
            <div className="flex rounded-xl ">
                {/* Filter Record By Client */}
                <div className="flex items-center justify-between rounded-xl">
                    {/*<label className="p-2 text-slate-500 font-bold uppercase">By Name: </label>*/}
                    <select onClick={eventHandler}
                            className="rounded-md text-slate-500 border border-slate-800 ">
                        {
                            clientList ?
                                clientList.map((client) => {
                                    return <option key={client["id"]}
                                                   value={client["id"]}>{client["id"]} {client["name"]}</option>
                                }) : null
                        }
                    </select>
                </div>

                <div className="flex rounded-xl">
                    {/*  Filter by Dates  */}
                    <div className="flex ">
                        {/*<label className="p-2 text-slate-500 font-bold uppercase">From: </label>*/}
                        <input name="fromDate" type="date" onChange={fromDateEventHandler}
                               className=""/>
                    </div>
                    <div className="flex">
                        {/*<label className="p-2 text-slate-500 font-bold uppercase">To: </label>*/}
                        <input name="toDate"
                               type="date" onChange={toDateEventHandler}
                               className=""/>
                    </div>
                </div>
                <div>
                    <button onClick={ShowAllData}
                            className=""
                    >Show All
                    </button>
                </div>
            </div>
                <table className="table-auto scroll-smooth ">
                    <caption className="">
                        All Client Entries Record
                    </caption>
                    <thead className="">
                    <tr >
                        <th className="">ID</th>
                        <th className="">CLIENT</th>
                        <th className="">DATE</th>
                        <th className="">DESCRIPTION</th>
                        <th className="">MUNS</th>
                        <th className="">KG</th>
                        <th className="">PRICE</th>
                        <th className="">BILL</th>
                        <th className="">AMOUNT</th>
                        <th className="">CLIENT ID</th>
                        <th className="">MESSAGE</th>
                        <th className="">BY</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        listData && listData.map((item, index) => (
                            <tr key={index}
                                className=" ">
                                <td className="">{item["id"]}</td>
                                <td className="">{item["client"]}</td>
                                <td className="">{item["date"]}</td>
                                <td className="">{item["desription"]}</td>
                                <td className="">{item["muns"]}</td>
                                <td className="">{item["kg"]}</td>
                                <td className="">{item["price"]}</td>
                                <td className="">{item["bill"]}</td>
                                <td className="">{item["amount"]}</td>
                                <td className="">{item["clientid"]}</td>
                                <td className="">{item["message"]}</td>
                                <td className="">{item["by"]}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
        </div>
    )
}