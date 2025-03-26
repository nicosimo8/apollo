import { NextResponse } from "next/server";
import { PythonShell } from 'python-shell';

export async function POST(req) {
  try {
    console.log('***Semáforo - INICIO***');
    console.log('- Consultando pedido');

    const { led, onoff } = await req.json();

    console.log(`- Pedido para GPIO #${led} por estado Estado`);

    await PythonShell.run(`./src/app/api/v1/lights/pythonScripts/lightCheck.py`, { args: [led] }, (err, results) => {
      if (err) throw err;
    }).then(messages => {
      console.log(messages);
    });

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