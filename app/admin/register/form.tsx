'use client'
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Form(){
    const [message, setMessage] = useState("");

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email:formData.get("email"),
                password:formData.get("password"),
                usertype:formData.get("usertype")
            })
        })
        console.log(response);
        if(response.ok){
            setMessage("Client Registered Successfully!");
        }else{  setMessage("Server Error!");}
    };
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <label className="text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800">Registration
                Form</label>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="email" type="email" placeholder="Email"/>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="password" type="password" placeholder="Password"/>
            <select name="usertype" className="border-2 border-rose-600 h-10 rounded-md">
                <option value="DEO">DEO</option>
                <option value="Admin">Admin</option>
            </select>
            <div className="flex gap-2">
                <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Register</button>
                <Link href="/admin" className="bg-amber-400 hover:bg-amber-500 p-2 w-16 rounded-3xl">Back</Link>
                { <span className="font-bold text-amber-700"> {message}</span> }
            </div>
        </form>
    )
}