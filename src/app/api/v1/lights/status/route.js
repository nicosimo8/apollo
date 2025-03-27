import { NextResponse } from "next/server";
import { spawn } from 'child_process';

export async function GET() {
  try {
    console.log('***Semáforo - INICIO***');
    console.log('- Consultando estados');

    const execPython = async (script, args) => {
      const argum = args.map(arg => arg.toString());

      const py = spawn("python3", [script, ...argum]);

      const result = await new Promise((resolve, reject) => {
        let output;

        py.stdout.on('data', (data) => {
          output = JSON.parse(data);
        });

        py.stderr.on('error', (err) => {
          console.error(`[python] Error ocurred: ${err}`);
          reject(`Error ocurred in ${script}`);
        })

        py.on('exit', (code) => {
          console.log(`Child process exited with code ${code}`);
          resolve(output);
        })
      });

      return result;
    };

    const data = await execPython('./src/app/api/v1/lights/status/lightsCheck.py');

    console.log('***Semáforo - FIN***');

    return NextResponse.json(
      { message: "Consulta exitosa", data: data },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: `Ha habido un error en la consulta: \n ${e}` },
      { status: 500 }
    );
  };
};

export async function POST(req) {
  try {
    console.log('***Semáforo - INICIO***');
    console.log('- Consultando pedido');

    const { led } = await req.json();

    console.log(`- Pedido para GPIO #${led} por estado Estado`);

    const execPython = async (script, args) => {
      const argum = args.map(arg => arg.toString());

      const py = spawn("python3", [script, ...argum]);

      const result = await new Promise((resolve, reject) => {
        let output;

        py.stdout.on('data', (data) => {
          output = JSON.parse(data);
        });

        py.stderr.on('error', (err) => {
          console.error(`[python] Error ocurred: ${err}`);
          reject(`Error ocurred in ${script}`);
        })

        py.on('exit', (code) => {
          console.log(`Child process exited with code ${code}`);
          resolve(output);
        })
      });

      return result;
    };

    const data = await execPython('./src/app/api/v1/lights/status/lightCheck.py', [led]);

    console.log('***Semáforo - FIN***');

    return NextResponse.json(
      { message: "Consulta exitosa", data: data },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: `Ha habido un error en la consulta: \n ${e}` },
      { status: 500 }
    );
  };
};
