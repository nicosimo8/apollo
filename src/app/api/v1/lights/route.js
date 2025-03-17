import { NextResponse } from "next/server";
import { PythonShell } from 'python-shell';

export async function POST(req) {
  try {
    console.log('***Semáforo - INICIO***');
    console.log('- Consultando pedido');

    const {
      light,
      number
    } = await req.json();

    console.log(`- Pedido para #${number} color ${light || ' - '}`);

    await PythonShell.run('./src/app/api/v1/lights/pythonScripts/functionTest.py', { args: [number] }, (err, results) => {
      if (err) throw err;
      console.log('Results: ', results);
    });

    console.log('***Semáforo - FIN***');

    if (loginUs && loginPs) {
      return NextResponse.json(
        { message: "Validado con éxito", validation: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Usuario o Contraseña incorrectos", validation: false },
        { status: 404 }
      );
    };
  } catch (e) {
    return NextResponse.json(
      { message: `Ha habido un error en la validación de datos: \n ${e.message}`, validation: false },
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
