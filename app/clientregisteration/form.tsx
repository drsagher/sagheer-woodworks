'use client'
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import Link from "next/link";

export default function Form(){
    const router = useRouter();
    const [message, setMessage] = useState("");
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if(formData.get('name') === ""){
            setMessage("Please enter a name");
        }
        if(formData.get('shop') === ""){
            setMessage("Please enter a shop name");
        }
        if(formData.get('mobile') === ""){
            setMessage("Please enter a mobile number");
        }
        if(!(formData.get('name') === "" && (formData.get('shop') === "" && formData.get('mobile') === ""))){
            const response = await fetch('/api/auth/client', {
                method: 'POST',
                body: JSON.stringify({
                    name:formData.get("name"),
                    shop:formData.get("shop"),
                    mobile:formData.get("mobile")
                })
            })
            console.log(response);
            if(response.ok){
                setMessage("Client Registered Successfully!");
                router.push('/admin');
                router.refresh();
            }
            else{
                setMessage("Server Error!");
            }
        }
    };
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <label className="text-center font-bold bg-amber-200 rounded-md p-2 text-amber-800">Client Registration
                Form</label>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="name" type="text" placeholder="Client full name"/>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="shop" type="text" placeholder="Client Shop name"/>
            <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                   name="mobile" type="text" placeholder="Client mobile with country code"/>
            <div className="flex gap-2">
                <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Register</button>
               <Link href="/admin" className="bg-amber-400 hover:bg-amber-500 p-2 w-16 rounded-3xl">Back</Link>
                { <span className="font-bold text-amber-700"> {message}</span> }
            </div>
        </form>
    )
}