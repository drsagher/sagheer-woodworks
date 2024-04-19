import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    try {
        const { rows, fields }  = await sql`select * from xentry where date between ${fromDate} and ${toDate}`;
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}