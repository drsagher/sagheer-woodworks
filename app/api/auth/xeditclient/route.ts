import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function GET(request: Request) {
    try {
        const { rows, fields }  = await sql`select * from xclients`;
        return NextResponse.json(rows);

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}