import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
import * as bcrypt from 'bcrypt';
export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id= searchParams.get('id');
    const password =  searchParams.get('password');
    // @ts-ignore
    const hashedPassword = await bcrypt.hash(password, 10).then(function(hash){ return hash });
    try {
        await sql`update users set password=${hashedPassword} where id=${id}`;
        return NextResponse.json({message: `Successfully updated ${id}`}, {status: 200});
    }catch (error) {
        return NextResponse.json(error);
    }
}