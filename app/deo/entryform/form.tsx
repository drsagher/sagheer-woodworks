'use client'
import React, {FormEvent, useCallback} from "react";
import Link from "next/link";
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import {useRouter} from "next/navigation";
import {cli} from "yaml/dist/cli";

export default function Form(){
    const router = useRouter();
    const [muns, setMuns] = useState('');
    const [kg, setKg] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [total, setTotal] = useState('');
    const [client, setClient] = useState('');
    const [clientId, setClientId] = useState('');

    // let msg = `Hello, ${client} SMS Alert coming soon`;
    const [message, setMessage] = useState('msg');

    // Get a Session ID

    // const getSessionId ="https://telenorcsms.com.pk:27677/corporate_sms2/api/auth.jsp?msisdn=923400088191&password=Sww@988";
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
                message:formData.get("message")
            })
        })
            if(response.ok){
            // setInfo("Entry Saved!");

            alert('Entry Saved Successfully');
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
        <div>
        <form  onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md py-4">
            <label className="text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800">Entry Form</label>
            <div className="flex gap-2 border-2 border-gray-200 p-2">
                <div className="flex flex-col gap-2 justify-center w-1/3">
                    <label className="font-bold text-md">Client ID :</label>
                    <label className="font-bold text-md">Client Name:</label>
                </div>
                <div className="flex flex-col gap-2  w-2/3">
                    <select className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
                            name="clientid" onClick={eventHandler}>
                        {
                            listData ?
                                listData.map((client) => {
                                    return <option key={client["name"]}
                                                   value={client["id"]}>{client["id"]} {client["name"]}</option>
                                }) : null
                        }
                    </select>
                    <select className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
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

            <input className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
                   name="date" type="date" placeholder="dd-mm-yyyy" />
            <input className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
                   name="desription" type="text" placeholder="desrciption" />
            <input onChange={(e) => setMuns(e.target.value)}
                   className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
                   name="muns" type="text" placeholder="Muns ..."/>
            <input onChange={(e) => setKg(e.target.value)}
                   className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
                   name="kg" type="text" placeholder="Kilograms ..."/>
            <input onChange={(e)=>setPrice(e.target.value)} className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
                   name="price" type="text" placeholder="Price/Mun ..."/>
            <input onClick={()=>{ const b = calcBill(parseInt(muns),parseInt(kg),parseInt(price)); setTotal(b.toString())} } className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
                   name="bill" type="text" placeholder="Total Bill" value={total}/>
            <input className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
                   name="amount" type="text" placeholder="Cash Received"/>
            <input className="border-2 border-gray-300 h-10 rounded-md pl-2 active:border-amber-400"
                   name="message" type="text" placeholder="Message " value={message} hidden={false}

            />
            <div className="flex gap-2">
                <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Save</button>
            </div>
        </form>
        </div>
    )
}