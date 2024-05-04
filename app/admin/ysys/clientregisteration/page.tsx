'use client'
import React, {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Clientregisteration() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if(!(formData.get('name') === "" && (formData.get('shop') === "" && formData.get('mobile') === "" && formData.get('status') === ""))){
            const response = await fetch('/api/auth/client', {
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
                router.push('/admin/ysys');
                router.refresh();
                alert("Client Registered Successfully!");
            }
            else{
                setMessage("Server Error!");
            }
        }
    };
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto w-full p-4">
            <label className="p-2 text-red-600 font-bold uppercase">Wood Client Registration
            </label>
            <input className="h-10 rounded-md  text-red-600 pl-2 border border-red-800"
                   name="name" type="text" placeholder="Client full name"/>
            <input className="h-10 rounded-md  text-red-600 pl-2 border border-red-800"
                   name="shop" type="text" placeholder="Client Shop name"/>
            <input className="h-10 rounded-md  text-red-600 pl-2 border border-red-800"
                   name="mobile" type="text" placeholder="Client mobile with country code"/>
            <select name="status"
                    className="h-10 rounded-md  text-red-600 pl-2 border border-red-800">
                <option key="active" value="active">Active</option>
                <option key="froze" value="froze">Froze</option>
            </select>
            <div className="flex gap-2">
                <button type="submit" className="text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Register</button>
                <Link href="/admin/ysys" className="text-center text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Back</Link>
                {<span className="font-bold text-amber-700"> {message}</span>}
            </div>
        </form>
    )
}