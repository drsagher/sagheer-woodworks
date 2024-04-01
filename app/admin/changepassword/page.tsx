'use client'
import {FormEvent, useCallback, useEffect, useState} from "react";
import Link from "next/link";
export default function ChangePassword() {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState(28);

    let userList:string = '/api/auth/getusers';

    const fetchUsersListData = useCallback(async (userList:string) => {
        try {
            const response = await fetch(userList);
            const data = await response.json();
            // console.log(data);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }, [setUsers]);
    useEffect(() => {
        fetchUsersListData(userList);
    }, [fetchUsersListData, userList]);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password");
        let saveUrl = `/api/auth/changepassword?id=${id}&password=${password}`;
        const response = await fetch(`${saveUrl}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    password:formData.get("password"),
                })
            })
        if (response.ok) {
            alert("Password Updated Successfully!");
        } else {
            alert("Server Error!");
        }
    }
return(
    <form className="flex flex-col gap-2 mx-auto max-w-md mt-10" onSubmit={handleSubmit}>
        <select className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
                onClick={(e) => setId(e.target.value)}>
            {
                users ?
                    users.map((user) => {
                        return <option key={user.email} value={user.id}>{user.id} {user.email}</option>
                    }) : null
            }
        </select>
        <input className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400"
               name="password" type="text" placeholder="Enter new password here"/>
        <div className="flex gap-2">
            <button type="submit" className="bg-amber-300 hover:bg-amber-400 p-2 w-24 rounded-3xl">Save</button>
            <Link href="/admin" className="bg-amber-400 hover:bg-amber-500 p-2 w-16 rounded-3xl">Back</Link>
        </div>
    </form>
)
}