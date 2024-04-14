import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT() {
    // const { rows, fields }  = await sql`select COUNT(id) from clients`;
    const status ="active";
    const {rows}  = await sql`select COUNT(id) as regclients from clients where status=${status}`;
    return NextResponse.json(rows);
}