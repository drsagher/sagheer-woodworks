'use client'
import React, {FormEvent, useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import {useRouter} from "next/navigation";

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
                message:`Dear Client ${formData.get("client")}!Your Previous Balance=${balance?.map((bal: any) => bal.balance)}. Current Bill=${formData.get("bill")}. Payment Received on ${formData.get("date")}=${formData.get("payment")}.Thank You! From: Sagheer Shop, Pakpattan`,
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
        <div>
            <form className="flex flex-col gap-2 mx-auto max-w-md py-4" onSubmit={handleSubmit}>
                <label className="p-2 text-slate-500 font-bold uppercase">Ledger Entry</label>

                <select className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800"
                        name="clientid">
                    {
                        listData ?
                            listData.map((client) => {
                                return <option key={client["name"]}
                                               value={client["id"]}>{client["id"]} {client["name"]}</option>
                            }) : null
                    }
                </select>
                <select className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800"
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
                    className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800"
                    name="description" type="text" placeholder="Desrciption" required={true}/>

                <input
                    className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800"
                    name="bill" type="text" placeholder="Bill amount" required={true}/>

                <input
                    className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800"
                    name="payment" type="text" placeholder="Payment" required={true}/>

                <input
                    className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800"
                    name="date" type="date" placeholder="dd-mm-yyyy" required={true}/>

                <div className="flex gap-2">
                    <button type="submit" className="text-slate-500 bg-slate-900 hover:bg-slate-800 p-1 w-24 rounded-md uppercase">Save</button>
                </div>

            </form>
        </div>
    )
}