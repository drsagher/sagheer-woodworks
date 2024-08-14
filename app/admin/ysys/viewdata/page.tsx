'use client'
import {useCallback, useEffect, useState} from "react";
import React from "react";
import { columns } from './columns';
import {DataTable} from "@/app/components/data-table";

export default function Page(){
    const [allList, setAllList] = useState([]);
    const [totalEntries, setTotalEntries] = useState([]);
    let allListUrl = "/api/auth/viewdata";
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
        fetch('/api/auth/totalentries',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((totalEntries) => {
                setTotalEntries(totalEntries)
            })
    }, []);
    return(
        <div className="flex flex-col overflow-auto">
            <p className="font-bold text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-center">
                All Wood Clients Entries - Total Entries:({totalEntries && totalEntries?.map(c => c["totalentries"])})</p>
        <div className="flex flex-col ">
           <DataTable columns={columns} data={allList}/>
        </div>
        </div>
    )
}