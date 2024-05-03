'use client'
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import Link from "next/link";
export default function ChangePassword() {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState(0);

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
const eventHandler = (e:React.ChangeEvent<any>) => {
      setId(e.target.value);
}
return(
    <form className="flex flex-col gap-2 w-full p-4" onSubmit={handleSubmit}>
        <label className="p-2 text-red-600 font-bold uppercase">Change Password</label>
        <select className="h-10 rounded-md  text-red-600 pl-2 border border-red-800"
                onClick={eventHandler}>
            {
                users ?
                    users.map((user) =>
                        <option key={user["email"]} value={user["id"]}>{user["id"]} {user["email"]}</option>
                    ) : null
            }
        </select>
        <input className="h-10 rounded-md  text-red-600 pl-2 border border-red-800"
               name="password" type="text" placeholder="Enter new password here"/>
        <div className="flex gap-2">
            <button type="submit" className="text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Save</button>
            <Link href="/admin" className="text-center text-white bg-red-800 hover:bg-red-600 p-1 w-24 rounded-2xl">Back</Link>
        </div>
    </form>
)
}