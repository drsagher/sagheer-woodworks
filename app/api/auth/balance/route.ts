import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const clientid = searchParams.get('clientid');
    try {
        const { rows, fields }  = await sql`select sum(bill::int)-sum(amount::int) as balance from entery where clientid=${clientid}`;
        return NextResponse.json(rows);

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}