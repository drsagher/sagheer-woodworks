'use client'
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import Link from "next/link";

export default function StatusClient(){
    let listUrl = "/api/auth/xviewallclient";

    const [clientList, setClientList] = useState([]);
    const [id, setId] = useState(1);
    const [statusc, setStatusc] = useState('froze');

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const status = formData.get("status");
        const response = await fetch(`/api/auth/xstatusclient?id=${id}&status=${statusc}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    status:formData.get("status")
                })
            })
        if (response.ok) {
            alert("Client Status Change!");
        } else {
            alert("Server Error!");
        }
    }

    const eventHandler = (e:React.ChangeEvent<any>) => {
        setId(e.target.value);
    }
    const statusEventHandler = (e:React.ChangeEvent<any>) => {
        setStatusc(e.target.value);
    }

    return(

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto w-full p-4">

            <label className="p-2 text-slate-500 font-bold uppercase">Change Status
            </label>
            <select onClick={eventHandler}
                    className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800">
                {
                    clientList ?
                        clientList.map((client) => {
                            return <option key={client["id"]}
                                           value={client["id"]}>{client["id"]} {client["name"]}</option>
                        }) : null
                }
            </select>

            <select onClick={statusEventHandler}
                    className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800">
                <option key="active" value="active">Active</option>
                <option key="froze" value="froze">Froze</option>
            </select>

            <div className="flex gap-2">
                <button type="submit" className="text-slate-500 bg-slate-900 hover:bg-slate-800 p-1 w-24 rounded-md uppercase">Save</button>
                <Link href="/admin" className="text-slate-500 bg-slate-900 hover:bg-slate-800 p-1 w-24 rounded-md uppercase">Back</Link>
            </div>

        </form>

    )
}