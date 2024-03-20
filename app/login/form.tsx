'use client'
import {FormEvent, useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {router} from "next/client";

export default function Form(){
    const [message, setMessage] = useState("");
    const router = useRouter();
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials',{email:formData.get('email'),password:formData.get('password'),usertype:formData.get('usertype'), redirect:false});
        console.log(response);
        if(!response?.error){
            if(formData.get('usertype') ==="Admin"){
                router.push("/admin");
                router.refresh();
            }else{
                router.push("/entryform");
                router.refresh();
            }

        }
    };
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <label className="text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800">Login Form</label>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="email" type="email" placeholder="Email" />
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="password" type="password" placeholder="Password" />
            <div className="flex flex-col gap-2">
                <select name="usertype" className="border-2 border-rose-600 h-10 rounded-md">
                    <option value="DEO" selected>DEO</option>
                    <option value="Admin" >Admin</option>

                </select>
                <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Login</button>
                { <span className="font-bold text-amber-700"> {message}</span> }
            </div>

        </form>
    )
}