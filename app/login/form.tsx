'use client'
import {FormEvent, useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import querystring from 'querystring';

export default function LoginForm(){
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
                router.push('/deo');
                router.refresh();
            }
        }
    };
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto max-w-md mt-2 mb-2 p-6">
            <label className="p-2 text-slate-900 font-bold uppercase">Login</label>

            <input
                className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800"
                name="email" type="email" placeholder="Enter email"/>

            <input
                className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800"
                name="password" type="password" placeholder="Password"/>

            <select name="usertype"
                    className="h-10 rounded-md bg-slate-900 text-slate-500 pl-2 border border-slate-800 active:border-slate-800">
                <option value="DEO" selected>DEO</option>
                <option value="Admin">Admin</option>
            </select>

            <button type="submit" className="text-slate-500 bg-slate-900 hover:bg-slate-800 p-1 w-24 rounded-md uppercase">Login</button>
        </form>
    )
}