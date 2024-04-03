'use client'
import React, {useCallback, useEffect, useState} from "react";
export default function Balance() {
    const [listData, setListData] = useState([]);
    const [id, setId] = useState(8);
    const [balance, setBalance] = useState([]);
    useEffect(() => {
        fetch(`/api/auth/viewclient`,{next:{revalidate:1}, method: 'PUT'})
            .then((res) => res.json())
            .then((listData) => {
                // @ts-ignore
                return setListData(listData)
            });
    }, [listData]);
    useEffect(() => {
        fetch(`/api/auth/balance?id=${id}`)
            .then((res) => res.json())
            .then((balance) => {
                setBalance(balance)
            });
    }, [id, balance]);
    const eventHandler = (e:React.ChangeEvent<any>) => {
        setId(e.target.value);
    }

    return(
        <div className="flex flex-col min-h-screen justify-center gap-6 py-6 px-6 items-center">

                <select className="border-2 border-rose-600 h-10 rounded-md pl-2 active:border-amber-400" name="client" onClick={eventHandler}>
                     {
                            listData?
                                listData.map((client)=>{
                                    return <option key={client["id"]} value={client["name"]}>{client["id"]} {client["name"]}</option>
                                }):null
                        }
                </select>

            <div className="flex text-md font-bold ">
                <p>Balance : <span className="text-red-800"> {balance.map(c=>c["payments"] - c["amount"])}</span></p>
            </div>

        </div>
    )
}