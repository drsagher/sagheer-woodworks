import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT() {
    const { rows, fields }  = await sql`select * from clients order by id`;
    return NextResponse.json(rows);
}