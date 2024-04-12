import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT(request: Request){
    const { rows, fields }  = await sql`select * from entery order by id`;
    return NextResponse.json(rows);
}