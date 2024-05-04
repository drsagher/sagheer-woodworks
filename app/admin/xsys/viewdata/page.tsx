'use client'
import {useCallback, useEffect, useState} from "react";
import React from "react";
import {DataTable} from "@/app/components/data-table";
import {columns} from "@/app/admin/ysys/viewdata/columns";

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
    const [totalEntries, setTotalEntries] = useState([]);


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

    useEffect( () => {
        fetch('/api/auth/xtotalentries',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((totalEntries) => {
                setTotalEntries(totalEntries)
            })
    }, []);

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
    return (
        <div className="flex flex-col overflow-auto">
            <p className="font-bold text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-center">
                All Ledger Clients Entries - Total Entries:({totalEntries && totalEntries.map(c => c["totalentries"])})</p>
            <div className="flex flex-col ">
                <DataTable columns={columns} data={allList}/>
            </div>
        </div>
    )
}