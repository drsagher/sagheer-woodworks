import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const client = searchParams.get('client');
    try {
        const { rows, fields }  = await sql`select sum(amount::int) as amount from entery where client=${client}`;
        return NextResponse.json(rows.map((row) => row.amount).join('\n'));

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}