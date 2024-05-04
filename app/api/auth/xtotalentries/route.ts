import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT() {
    const {rows}  = await sql`select COUNT(id) as totalentries from xentry`;
    return NextResponse.json(rows);
}