import { NextResponse } from "next/server";
import { PythonShell } from 'python-shell';
import { spawn } from 'child_process';

export async function POST(req) {
  try {
    console.log('***Semáforo - INICIO***');
    console.log('- Consultando pedido');

    const { led, onoff } = await req.json();
    let state;

    console.log(`- Pedido para GPIO #${led} por estado Estado`);

    // await PythonShell.run(`./src/app/api/v1/lights/status/lightCheck.py`, { args: [led] }, function (err, results) {
    //   if (err) throw err;
    // });

    const execPython = async (script, args) => {
      const argum = args.map(arg => arg.toString());

      const py = spawn("python3", [script, ...argum]);

      const result = await new Promise((resolve, reject) => {
        let output;

        py.stdout.on('data', (data) => {
          output = JSON.parse(data);
        });

        py.stderr.on("data", (data) => {
          console.error(`[python] Error ocurred: ${data}`);
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