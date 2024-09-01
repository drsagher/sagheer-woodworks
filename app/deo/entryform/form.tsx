'use client'
import React, {FormEvent, useCallback} from "react";
import { useEffect, useState } from 'react'
import {useRouter} from "next/navigation";
import {getSession} from "next-auth/react";
import { LuClipboardEdit } from "react-icons/lu";

export default function Form(){

    // User Information
    const [email, setEmail] = useState('');
    async function getUserDetails() {
        const session = await  getSession();
        const user = session?.user;
        const email = user?.email;
        email && setEmail(email);
    }
    getUserDetails().then();
    const router = useRouter();
    const [muns, setMuns] = useState('');
    const [kg, setKg] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [total, setTotal] = useState('');
    const [client, setClient] = useState('');
    const [clientId, setClientId] = useState('');

    // Get a Session ID

    // const getSessionId = fetch("https://telenorcsms.com.pk:27677/corporate_sms2/api/auth.jsp?msisdn=923400088191&password=Sww@988");
    // const toMobile = '923017362696';
    // const msg = 'Hello, World';
    // const mask ='Sagheer Wood Works';
    // const msgURL = `https://telenorcsms.com.pk:27677/corporate_sms2/api/sendsms.jsp?session_id=${getSessionId}&to=${toMobile}&text=${msg}&mask=${mask}`;

    const calcBill = (muns:number, kg:number, price:number) => {
        let result = 0;
        let weight = kg /40;
        result = muns + weight;
        // result = (muns * 40) + kg;
        result *= price;
        result = Math.round(result);
        return result;
    }

    const [listData, setListData] = useState([])
    useEffect(() => {
        fetch('/api/auth/viewclient',{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);

    const [balance, setBalance] = useState([]);
    useEffect(() => {
        fetch(`/api/auth/balance?clientid=${clientId}`,{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((balance) => {
                setBalance(balance)
            })
    }, [clientId]);

    const [info, setInfo] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/auth/entery', {
            method: 'POST',
            body: JSON.stringify({
                client:formData.get("client"),
                date:formData.get("date"),
                desription:formData.get("desription"),
                muns:formData.get("muns"),
                kg:formData.get("kg"),
                price:formData.get("price"),
                bill:formData.get("bill"),
                amount:formData.get("amount"),
                clientid:formData.get("clientid"),
                message:`Dear Client ${formData.get("client")}! Your Previous Balance=${balance?.map((bal: any) => bal.balance)}. Current Bill=${formData.get("bill")}. Payment Received on ${formData.get("date")}=${formData.get("amount")}.Thank You! From Sagheer Shop, Pakpattan. Call on 0307-7111988`,
                by: email,
            })
        })
            if(response.ok){
            alert('Entry Saved Successfully');
                console.log(response)
            router.push('/deo');
            router.refresh();
            }else{  setInfo("Server Error!");
            }
    };

    const eventHandler = (e:React.ChangeEvent<any>) => {
        setClientId(e.target.value);
    }
    const eventHandlerId = (e:React.ChangeEvent<any>) => {
        setClient(e.target.value);
    }

    return(
        // <div>
            <form onSubmit={handleSubmit} className="flex flex-col min-h-screen gap-4 mx-auto max-w-md py-4 w-full">
                <label className="flex items-center gap-2 p-2 text-red-600 font-bold uppercase"><LuClipboardEdit size={35}/>Wood Client Entry</label>
                <div className="flex gap-2 border-2 border-slate-100 p-2">
                    <div className="flex flex-col gap-2 justify-center w-1/3">
                        <label className="p-2 text-red-600 font-bold uppercase">Client ID :</label>
                        <label className="p-2 text-red-600 font-bold uppercase">Client Name:</label>
                    </div>
                    <div className="flex flex-col gap-2  w-2/3">
                        <select className="h-10 rounded-md  text-red-600 pl-2 border border-red-800"
                                name="clientid" onClick={eventHandler}>
                            {
                                listData ?
                                    listData.map((client) => {
                                        return <option key={client["name"]}
                                                       value={client["id"]}>{client["id"]} {client["name"]}</option>
                                    }) : null
                            }
                        </select>
                        <select className="h-10 rounded-md  text-red-600 pl-2 border border-red-800"
                                name="client" onClick={eventHandlerId}>
                            {
                                listData ?
                                    listData.map((client) => {
                                        return <option key={client["id"]}
                                                       value={client["name"]}>{client["id"]} {client["name"]}</option>
                                    }) : null
                            }
                        </select>
                    </div>
                </div>

                <input
                    className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                    name="date" type="date" placeholder="dd-mm-yyyy" required={true}/>
                <input
                    className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                    name="desription" type="text" placeholder="desrciption" required={true}/>
                <input onChange={(e) => setMuns(e.target.value)}
                       className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                       name="muns" type="text" placeholder="Muns ..." required={true}/>
                <input onChange={(e) => setKg(e.target.value)}
                       className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                       name="kg" type="text" placeholder="Kilograms ..." required={true}/>
                <input onChange={(e) => setPrice(e.target.value)}
                       className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                       name="price" type="text" placeholder="Price/Mun ..." required={true}/>
                <input onClick={() => {
                    const b = calcBill(parseInt(muns), parseInt(kg), parseInt(price));
                    setTotal(b.toString())
                }}
                       className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                       name="bill" type="text" placeholder="Total Bill" value={total} required={true}/>
                <input
                    className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 w-full"
                    name="amount" type="text" placeholder="Cash Received" required={true}/>

                <div className="flex gap-2 w-full">
                    <button type="submit" className="text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Save</button>
                </div>
            </form>
        // </div>
    )
}