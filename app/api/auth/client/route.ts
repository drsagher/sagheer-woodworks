import {NextResponse} from "next/server";
import {sql} from '@vercel/postgres'
export async function POST(request: Request) {
    try{
        const {name, shop, mobile} = await request.json();
        console.log({name, shop, mobile});
        const response = await sql`insert into clients (name, shop, mobile) VALUES (${name},${shop},${mobile})`;
    }catch(e){
        console.log({e});
    }
    return NextResponse.json({message:"success"});
}