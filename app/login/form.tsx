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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto max-w-md mt-2 mb-2 p-6 bg-slate-50 rounded-2xl">
            <label className="text-center p-2 text-red-600 font-bold uppercase">Login</label>

            <input
                className="h-10 rounded-md text-red-600 pl-2 border border-red-800"
                name="email" type="email" placeholder="Enter email"/>

            <input
                className="h-10 rounded-md text-red-600 pl-2 border border-red-800"
                name="password" type="password" placeholder="Password"/>

            <select name="usertype"
                    className="h-10 rounded-md text-red-600 pl-2 border border-red-800">
                <option value="DEO" selected>DEO</option>
                <option value="Admin">Admin</option>
            </select>

            <button type="submit" className="text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Login</button>
        </form>
    )
}