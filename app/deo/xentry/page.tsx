'use client'
import React, {FormEvent, useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import { LuClipboardEdit } from "react-icons/lu";

export default function XEntry(){
    const [listData, setListData] = useState([])
    const [clientId, setClientId] = useState('');
    const [client, setClient] = useState('');
    const router = useRouter();

    const [email, setEmail] = useState('');
    async function getUserDetails() {
        const session = await  getSession();
        const user = session?.user;
        const email = user?.email;
        email && setEmail(email);
    }

    useEffect(() => {
        fetch('/api/auth/xviewclient',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);

    // const eventHandler = (e:React.ChangeEvent<any>) => {
    //     setClientId(e.target.value);
    // }
    // const eventHandlerId = (e:React.ChangeEvent<any>) => {
    //     setClient(e.target.value);
    // }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/auth/xentry', {
            method: 'POST',
            body: JSON.stringify({
                client:formData.get("client"),
                description:formData.get("description"),
                bill:formData.get("bill"),
                payment:formData.get("payment"),
                message:`Dear Client ${formData.get("client")}!Your Previous Balance=${balance?.map((bal: any) => bal.balance)}. Current Bill=${formData.get("bill")}. Payment Received on ${formData.get("date")}=${formData.get("payment")}.Thank You! From Sagheer Shop, Pakpattan. Call on 0307-7111988`,
                by: email,
                date:formData.get("date"),
                clientid:formData.get("clientid"),
            })
        })
        if(response.ok){
            alert('Entry Saved Successfully');
            router.push('/deo');
            router.refresh();
        }else{  alert("Server Error!");
        }
    };

    const [balance, setBalance] = useState([]);
    useEffect(() => {
        fetch(`/api/auth/xbalance?clientid=${clientId}`,{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((balance) => {
                setBalance(balance)
            })
    }, [clientId]);

    return(
        // <div>
            <form className="flex flex-col min-h-screen gap-4 mx-auto max-w-md py-4 w-full" onSubmit={handleSubmit}>
                <label className="flex items-center gap-2 p-2 text-red-600 font-bold uppercase"><LuClipboardEdit size={35}/>
                    Ledger Client Entry</label>

                <select className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                        name="clientid">
                    {
                        listData ?
                            listData.map((client) => {
                                return <option key={client["name"]}
                                               value={client["id"]}>{client["id"]} {client["name"]}</option>
                            }) : null
                    }
                </select>
                <select className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                        name="client">
                    {
                        listData ?
                            listData.map((client) => {
                                return <option key={client["id"]}
                                               value={client["name"]}>{client["id"]} {client["name"]}</option>
                            }) : null
                    }
                </select>

                <input
                    className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                    name="description" type="text" placeholder="Desrciption" required={true}/>

                <input
                    className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                    name="bill" type="text" placeholder="Bill amount" required={true}/>

                <input
                    className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                    name="payment" type="text" placeholder="Payment" required={true}/>

                <input
                    className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                    name="date" type="date" placeholder="dd-mm-yyyy" required={true}/>

                <div className="flex gap-2 w-full">
                    <button type="submit" className="text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Save</button>
                </div>

            </form>
        // </div>
    )
}