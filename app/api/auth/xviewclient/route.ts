import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT() {
    const status ="active";
    const { rows, fields }  = await sql`select * from xclients where status=${status} order by id`;
    return NextResponse.json(rows);
}