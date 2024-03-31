import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        const { rows, fields }  = await sql`select * from clients where id=${id}`;
        return NextResponse.json(rows);

    } catch (error) {
        return NextResponse.json(error);
    }
}