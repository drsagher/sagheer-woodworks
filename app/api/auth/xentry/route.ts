import {NextResponse} from "next/server";
import {sql} from '@vercel/postgres'
export async function POST(request: Request) {
    try{
        const {client, description, bill, payment, message, by, date, clientid} = await request.json();
        console.log({client, description, bill, payment, message, by, date, clientid});
        const response = await sql`insert into xentry (client, description, bill, payment, message, by, date, clientid) VALUES (${client}, ${description}, ${bill}, ${payment}, ${message}, ${by}, ${date}, ${clientid})`;
    }catch(e){
        console.log({e});
    }
    return NextResponse.json({message:"success"});
}