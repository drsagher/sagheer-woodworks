import {NextResponse} from "next/server";
import {sql} from '@vercel/postgres'
export async function POST(request: Request) {
    try{
        const {name, shop, mobile, status} = await request.json();
        console.log({name, shop, mobile, status});
        const response = await sql`insert into clients (name, shop, mobile, status) VALUES (${name},${shop},${mobile},${status})`;
    }catch(e){
        console.log({e});
    }
    return NextResponse.json({message:"success"});
}