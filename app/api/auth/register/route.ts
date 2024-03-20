import {NextResponse} from "next/server";
import { hash } from 'bcrypt';
import {sql} from '@vercel/postgres'
export async function POST(request: Request) {
try{
    const {email, password, usertype} = await request.json();
    console.log({email, password, usertype});
    const hashedPassword = await hash(password,10);
    const response = await sql`insert into users (email, password, usertype) VALUES (${email},${hashedPassword},${usertype})`;
}catch(e){
    console.log({e});
}
return NextResponse.json({message:"success"});
}