import { NextResponse } from "next/server";
import fs from 'fs';

export async function POST(req) {
  try {
    const config = await req.json();

    fs.writeFileSync("./src/app/pages/config/config.json", JSON.stringify(config));

    return NextResponse.json(
      { message: "Consulta exitosa", data: config },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: `Ha habido un error en la consulta: \n ${e.message}` },
      { status: 500 }
    );
  };
};
