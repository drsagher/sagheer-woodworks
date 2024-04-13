import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function GET() {
    const { rows, fields }  = await sql`select COUNT(*) AS regusers from clients`;
    return NextResponse.json(rows);
}