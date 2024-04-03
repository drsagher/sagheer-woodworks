'use client'
import Link from "next/link";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
export default function Form() {

    const [client, setClient] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [id, setId] = useState(28);
    const [cname, setCname] = useState("");
    const [cshop, setCshop] = useState("");
    const [cmobile, setCmobile] = useState("");

    let listUrl = "/api/auth/viewclient";
    let clientUrl = `/api/auth/client/getclient?id=${id}`;

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
    console.log(clientList);

    const fetchClientData = useCallback(async (url:string) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            setClient(data);
            // setId(data.id);
        } catch (error) {
            console.log(error);
        }
    }, [setClient]);
    useEffect(() => {
        fetchClientData(clientUrl);
    }, [fetchClientData, clientUrl]);
    console.log(client);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const shop = formData.get('shop');
        const mobile = formData.get("mobile");
        const response = await fetch(`/api/auth/updateclient?id=${id}&name=${name}&shop=${shop}&mobile=${mobile}`,
            {
                method: 'PUT',
                body: JSON.stringify({
            name:formData.get("name"),
            shop:formData.get("shop"),
            mobile:formData.get("mobile")
        })
    })
        if (response.ok) {
            alert("Client Record Updated Successfully!");
        } else {
            alert("Server Error!");
        }
    }

    const nameClickHandler =()=>{
        client?.map((client: any) => setCname(client.name));
    }
    const shopClickHandler =()=>{
        client?.map((client: any) => setCshop(client.shop));
    }
    const mobileClickHandler =()=>{
        client?.map((client: any) => setCmobile(client.mobile));
    }
    function formHandler() {
    }
    formHandler();
    const eventHandler = (e:React.ChangeEvent<any>) => {
        setId(e.target.value);
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10" >
            <label className="text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800">Update Client
            </label>
            <select onClick={eventHandler} className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400">
                {
                    clientList ?
                        clientList.map((client) => {
                            return <option key={client["id"]} value={client["id"]} >{client["id"]} {client["name"]}</option>
                        }) : null
                }
            </select>

            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="name" type="text" placeholder="Client full name"
                   value={cname} onClick={nameClickHandler} onChange={(e) => setCname(e.target.value)}/>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="shop" type="text" placeholder="Client Shop name"
                   value={cshop} onClick={shopClickHandler} onChange={(e) => setCshop(e.target.value)}/>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="mobile" type="text" placeholder="Client mobile with country code"
                   value={cmobile} onClick={mobileClickHandler} onChange={(e) => setCmobile(e.target.value)}/>
            <div className="flex gap-2">
                <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Save</button>
                <Link href="/admin" className="bg-amber-400 hover:bg-amber-500 p-2 w-16 rounded-3xl">Back</Link>
            </div>
        </form>
    )
}