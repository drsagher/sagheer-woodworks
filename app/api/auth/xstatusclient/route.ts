import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id= searchParams.get('id');
    const status =  searchParams.get('status');

    try {
        await sql`update xclients set status=${status} where id=${id}`;
        return NextResponse.json({message: `Client Status Changed ${id}`}, {status: 200});
    }catch (error) {
        return NextResponse.json(error);
    }
}