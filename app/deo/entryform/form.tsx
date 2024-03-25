'use client'
import {FormEvent, useCallback} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import { sql } from '@vercel/postgres';
import { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function Form(){
    const [muns, setMuns] = useState('');
    const [kg, setKg] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [total, setTotal] = useState('');
    const [client, setClient] = useState('');
const calcBill = (muns:number, kg:number, price:number) => {
    let result = 0;
    result = (muns * 40) + kg;
    result *= price;
    return result;
}
 const [listData, setListData] = useState([])
    useEffect(() => {
        fetch('/api/auth/entery/client')
            .then((res) => res.json())
            .then((listData) => {
                setListData(listData)
            })
    }, []);
    const [message, setMessage] = useState("");
    const [data, setData] = useState([])
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
                amount:formData.get("amount")
            })
        })
        console.log(response);
        if(response.ok){
            setMessage("Entery Saved!");
        }else{  setMessage("Server Error!");}
    };
    return(
        <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <label className="text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800">Entry Form</label>
            <Select name="client" onValueChange={(e)=>{setClient(e); }}>
                <SelectTrigger name="name" className="border-2 border-amber-800" >
                    <SelectValue placeholder="Clients"/>
                </SelectTrigger>
                <SelectContent >
                    {
                        listData?
                            listData.map((client)=>{
                                return <SelectItem value={client.name}>{client.id} {client.name}</SelectItem>
                            }):null
                    }
                </SelectContent>
            </Select>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="date" type="text" placeholder="dd-mm-yyyy"/>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="desription" type="text" placeholder="desrciption"/>
            <input onChange={(e)=>setMuns(e.target.value )} className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="muns" type="text" placeholder="Muns ..."/>
            <input onChange={(e)=>setKg(e.target.value )} className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="kg" type="text" placeholder="Kilograms ..."/>
            <input onChange={(e)=>setPrice(e.target.value)} className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="price" type="text" placeholder="Price per Kilogram ..."/>
            <input onClick={()=>{ const b = calcBill(parseInt(muns),parseInt(kg),parseInt(price)); setTotal(b.toString())} } className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="bill" type="text" placeholder="Total Bill" value={total}/>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="amount" type="text" placeholder="Cash Received"/>
            <div className="flex gap-2">
                <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Save</button>
                <Link href="/admin" className="bg-amber-400 hover:bg-amber-500 p-2 w-16 rounded-3xl">Back</Link>
                <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Send SMS</button>
                {<span className="font-bold text-amber-700"> {message}</span>}
            </div>
        </form>
        </div>
    )
}