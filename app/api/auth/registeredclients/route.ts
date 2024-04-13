import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT() {
    // const { rows, fields }  = await sql`select COUNT(id) from clients`;
    const {rows}  = await sql`select COUNT(id) as regclients from clients`;
    return NextResponse.json(rows);
}