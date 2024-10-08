import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id= searchParams.get('id');
    const name =  searchParams.get('name');
    const shop = searchParams.get('shop');
    const mobile =  searchParams.get('mobile');
    try {
      await sql`update clients set name=${name}, shop=${shop}, mobile=${mobile} where id=${id}`;
      return NextResponse.json({message: `Successfully updated ${id}`}, {status: 200});
    }catch (error) {
        return NextResponse.json(error);
    }
}