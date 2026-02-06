import { NextResponse } from "next/server";
import { pool } from "@/utils/mysql";

export async function GET(req, { params }) {
  try {
    const { light } = await params;
    const res = await pool.query('SELECT * FROM lights WHERE id = ?;', [light]);

    if (res[0].length < 1) {
      return NextResponse.json({ message: "No encontrado" }, { status: 404 })
    }

    return NextResponse.json(res[0][0]);
  } catch (e) {
    return NextResponse.json({ mesasge: e.message }, { status: 500 });
  };
};

export async function PUT(req, { params }) {
  try {
    const { light } = await params;
    const data = await req.json();

    const res = await pool.query('UPDATE lights SET ? WHERE id = ?;', [data, light]);
    res

    const updData = await pool.query('SELECT * FROM lights WHERE id = ?;', [light]);

    if (updData[0].length < 1) {
      return NextResponse.json({ message: "No encontrado" }, { status: 404 })
    }

    return NextResponse.json(updData[0][0]);
  } catch (e) {
    return NextResponse.json({ mesasge: e.message }, { status: 500 });
  };
};
