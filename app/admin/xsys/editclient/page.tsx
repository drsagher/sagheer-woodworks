'use client'
import Link from "next/link";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
export default function Form() {

    const [client, setClient] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [id, setId] = useState(28);
    const [cname, setCname] = useState("");
    const [cshop, setCshop] = useState("");
    const [cmobile, setCmobile] = useState("");
    const router = useRouter();

    let listUrl = "/api/auth/xviewclient";
    let clientUrl = `/api/auth/xclient/getclient?id=${id}`;

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
        const response = await fetch(`/api/auth/xupdateclient?id=${id}&name=${name}&shop=${shop}&mobile=${mobile}`,
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
            router.push('/admin/xsys');
            router.refresh();
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto w-full p-4" >
            <label className="p-2 text-red-600 font-bold uppercase">Ledger Client Update
            </label>
            <select onClick={eventHandler} className="h-10 rounded-md  text-red-600 pl-2 border border-red-800">
                {
                    clientList ?
                        clientList.map((client) => {
                            return <option key={client["id"]} value={client["id"]} >{client["id"]} {client["name"]}</option>
                        }) : null
                }
            </select>

            <input className="h-10 rounded-md  text-red-600 pl-2 border border-red-800"
                   name="name" type="text" placeholder="Client full name"
                   value={cname} onClick={nameClickHandler} onChange={(e) => setCname(e.target.value)}/>
            <input className="h-10 rounded-md text-red-600 pl-2 border border-red-800"
                   name="shop" type="text" placeholder="Client Shop name"
                   value={cshop} onClick={shopClickHandler} onChange={(e) => setCshop(e.target.value)}/>
            <input className="h-10 rounded-md text-red-600 pl-2 border border-red-800"
                   name="mobile" type="text" placeholder="Client mobile with country code"
                   value={cmobile} onClick={mobileClickHandler} onChange={(e) => setCmobile(e.target.value)}/>
            <div className="flex gap-2">
                <button type="submit" className="text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Save</button>
            </div>
        </form>
    )
}