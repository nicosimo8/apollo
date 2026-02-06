import { NextResponse } from "next/server";
import { pool } from "@/utils/mysql";

export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM configs WHERE id = 0;');

    return NextResponse.json(res[0]);
  } catch (e) {
    return NextResponse.json({ mesasge: e.message }, { status: 500 });
  };
};

export async function PUT(req) {
  try {
    const data = await req.json();

    const res = await pool.query('UPDATE configs SET ? WHERE id = 0;', [data]);
    res

    const updData = await pool.query('SELECT * FROM configs WHERE id = 0;');

    return NextResponse.json(updData[0]);
  } catch (e) {
    return NextResponse.json({ mesasge: e.message }, { status: 500 });
  };
};
