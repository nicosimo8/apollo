import { NextResponse } from "next/server";
import { pool } from "@/utils/mysql";

export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM lights;');

    return NextResponse.json(res[0]);
  } catch (e) {
    return NextResponse.json({ mesasge: e.message }, { status: 500 });
  };
};