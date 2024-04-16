'use client'
import React, {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function XRegister(){
    const router = useRouter();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if(!(formData.get('name') === "" && (formData.get('shop') === "" && formData.get('mobile') === "") && formData.get('status') === "")){
            const response = await fetch('/api/auth/xclientregister', {
                method: 'POST',
                body: JSON.stringify({
                    name:formData.get("name"),
                    shop:formData.get("shop"),
                    mobile:formData.get("mobile"),
                    status:formData.get("status")
                })
            })
            console.log(response);
            if(response.ok){
                setMessage("Client Registered Successfully!");
                router.push('/admin/xsys');
                router.refresh();
                alert("Client Registered Successfully!");
            }
            else{
                setMessage("Server Error!");
            }
        }
    };

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md py-4">
            <label className="text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800">X Client
                Registration</label>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="name" type="text" placeholder="Client full name" required={true}/>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="shop" type="text" placeholder="Client Shop name" required={true}/>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="mobile" type="text" placeholder="Client mobile with country code" required={true}/>
            <select name="status"
                    className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400">
                <option key="active" value="active">Active</option>
                <option key="froze" value="froze">Froze</option>
            </select>
            <div className="flex gap-2">
                <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Register</button>
                <Link href="/admin/xsys" className="bg-amber-400 hover:bg-amber-500 p-2 w-16 rounded-3xl">Back</Link>
                {<span className="font-bold text-amber-700"> {message}</span>}
            </div>
        </form>
    )
}