import { sql } from '@vercel/postgres';
import {NextResponse} from "next/server";
export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id= searchParams.get('id');
    const name =  searchParams.get('name');
    const shop = searchParams.get('shop');
    const mobile =  searchParams.get('mobile');
    try {
        // const id=29;
        // const name = "DR. ABS Sagher";
        // const shop ="MST Tech LLC";
        // const mobile = "+923336951098";
        // const {id, name, shop, mobile} = request.json();
      await sql`update xclients set name=${name}, shop=${shop}, mobile=${mobile} where id=${id}`;
      return NextResponse.json({message: `Successfully updated ${id}`}, {status: 200});
    }catch (error) {
        return NextResponse.json(error);
    }
}