import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT(request: Request) {
    try {
        const { rows, fields }  = await sql`select sum(bill::int)-sum(payment::int) as balance from xentry`;
        return NextResponse.json(rows);

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}