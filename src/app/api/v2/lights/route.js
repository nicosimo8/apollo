import { NextResponse } from "next/server";
import { PythonShell } from 'python-shell';
import lock from '@/../lock.json';

export async function POST(req) {
  try {
    console.log('***Semáforo - INICIO***');
    console.log('- Consultando pedido');

    if (lock.lock) throw new Error('Licencia expiranda');

    const { led, onoff } = await req.json();
    let file = "lightOn.py";

    console.log(`- Pedido para GPIO #${led} - Estado: ${onoff}`);

    if (onoff) {
      file = "lightOn.py"
    } else {
      file = "lightOff.py"
    }

    await PythonShell.run(`./src/app/api/v1/lights/pythonScripts/${file}`, { args: [led] }, (err, results) => {
      if (err) throw err;
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

export async function GET() {
  try {
    console.log('***Test de LEDs - INICIO***');

    await PythonShell.run('./src/app/api/v1/lights/lightsTest.py', (err, results) => {
      if (err) throw err;
      console.log('Results: ', results);
    });

    console.log('***Test de LEDs - FIN***');

    return NextResponse.json(
      { message: "Validado sin errores", validation: true },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: `Ha habido un error al probar los LEDs: \n ${e.message}`, validation: false },
      { status: 500 }
    );
  };
};
