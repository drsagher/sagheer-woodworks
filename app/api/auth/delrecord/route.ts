import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        await sql`delete from entery where id=${id}`;
        return NextResponse.json(true);

    } catch (error) {
        return NextResponse.json(false);
    }
}