import {NextResponse} from "next/server";
import {sql} from '@vercel/postgres'
export async function POST(request: Request) {
    try{
        const {client, date, desription, muns, kg, price, bill, amount} = await request.json();
        console.log({client, date, desription, muns, kg, price, bill, amount});
        const response = await sql`insert into entery (client, date, desription, muns, kg, price, bill, amount) VALUES (${client}, ${date}, ${desription}, ${muns}, ${kg}, ${price}, ${bill}, ${amount})`;
    }catch(e){
        console.log({e});
    }
    return NextResponse.json({message:"success"});
}