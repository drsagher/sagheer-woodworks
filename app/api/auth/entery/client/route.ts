import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function GET(request: Request){
    const { rows, fields }  = await sql`select * from clients;`;
    return NextResponse.json(rows);
}