'use client'
import {useCallback, useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
export default function Balance() {
    const [listData, setListData] = useState([]);
    const [client, setClient] = useState('');
    const [balance, setBalance] = useState();
    useEffect(() => {
        fetch(`/api/auth/entery/client`)
            .then((res) => res.json())
            .then((listData) => {
                // @ts-ignore
                return setListData(listData)
            });
    }, [listData]);
    useEffect(() => {
        fetch(`/api/auth/balance?client=${client}`)
            .then((res) => res.json())
            .then((balance) => {
                return setBalance(balance)
            });
    }, [client, balance]);
    return(
        <div className="flex items-center justify-center gap-6 py-6 px-6">
            <div className="w-1/4">
                <Select name="client" onValueChange={(e)=>{setClient(e); }}>
                    <SelectTrigger name="name" className="border-2 border-amber-800" >
                        <SelectValue placeholder="Clients"/>
                    </SelectTrigger>
                    <SelectContent >
                        {
                            listData?
                                listData.map((client)=>{
                                    return <SelectItem value={client.name}>{client.id} {client.name}</SelectItem>
                                }):null
                        }
                    </SelectContent>
                </Select>
            </div>
            <div>
                <p className="text-xl font-bold">Balance = {JSON.stringify(balance)}</p>
            </div>
        </div>
    )
}