'use client'
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import Link from "next/link";

export default function StatusClient(){
    let listUrl = "/api/auth/viewallclient";

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
        const response = await fetch(`/api/auth/statusclient?id=${id}&status=${statusc}`,
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md py-4">

            <label className="text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800">Change Status
            </label>
            <select onClick={eventHandler}
                    className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400">
                {
                    clientList ?
                        clientList.map((client) => {
                            return <option key={client["id"]}
                                           value={client["id"]}>{client["id"]} {client["name"]}</option>
                        }) : null
                }
            </select>

            <select onClick={statusEventHandler}
                    className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400">
                <option key="active" value="active">Active</option>
                <option key="froze" value="froze">Froze</option>
            </select>

            <div className="flex gap-2">
                <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Save</button>
                <Link href="/admin" className="bg-amber-400 hover:bg-amber-500 p-2 w-16 rounded-3xl">Back</Link>
            </div>

        </form>

    )
}