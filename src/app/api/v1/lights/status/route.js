import { NextResponse } from "next/server";
import { PythonShell } from 'python-shell';

export async function POST(req) {
  try {
    console.log('***Semáforo - INICIO***');
    console.log('- Consultando pedido');

    const { led, onoff } = await req.json();
    let state;

    console.log(`- Pedido para GPIO #${led} por estado Estado`);

    await PythonShell.run(`./src/app/api/v1/lights/pythonScripts/lightCheck.py`, { args: [led] }, function (err, results) {
      if (err) throw err;
      state = results;
    });

    console.log(await state);

    console.log('***Semáforo - FIN***');

    return NextResponse.json(
      { message: "Consulta exitosa" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: `Ha habido un error en la consulta: \n ${e.message}` },
      { status: 500 }
    );
  };
};