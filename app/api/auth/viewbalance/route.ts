import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Assuming you have properly configured your PostgreSQL connection
// Make sure you have imported the 'sql' function correctly

export async function PUT(request: Request) {
    try {
        // Assuming you have properly configured your PostgreSQL connection
        const { rows,fields } = await sql`SELECT clientid, client, SUM(bill::INT) AS bill, SUM(amount::INT) as amount, (SUM(bill::INT)-SUM(amount::INT)) as balance FROM entery group by clientid, client ORDER BY clientid::INT`;
        return NextResponse.json(rows);

    } catch (Error) {
        return NextResponse.json({ error: Error }, { status: 500 });
    }
}
