import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        await sql`delete from xclients where id=${id}`;
        return NextResponse.json({message: `Client Successfully Deleted ${id}`}, {status: 200});
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}