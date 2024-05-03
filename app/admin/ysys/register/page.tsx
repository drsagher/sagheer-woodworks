'use client'
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
export default function RegisterPage() {
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto w-full p-4">
            <label className="p-2 text-red-600 font-bold uppercase">User Registration
                </label>
            <input className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 "
                   name="email" type="email" placeholder="Email"/>
            <input className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 "
                   name="password" type="password" placeholder="Password"/>
            <select name="usertype" className="h-10 rounded-md  text-red-600 pl-2 border border-red-800 ">
                <option value="DEO">DEO</option>
                <option value="Admin">Admin</option>
            </select>
            <div className="flex gap-2">
                <button type="submit" className="text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Register</button>
                <Link href="/admin" className="text-center text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Back</Link>
                { <span className="font-bold text-amber-700"> {message}</span> }
            </div>
        </form>
    )
}