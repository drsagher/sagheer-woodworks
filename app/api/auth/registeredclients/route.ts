import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT() {
    const { rows, fields }  = await sql`select COUNT(*) from clients`;
    return NextResponse.json(rows);
}