import { NextResponse } from "next/server";
import { PythonShell } from 'python-shell';

// import Gpio from 'onoff';
// const Gpio = require('onoff').Gpio;
// var gpiop = require('rpi-gpio').promise;
// const Gpio = require('pigpio').Gpio;

// export async function POST(req) {
//   try {
//     console.log('***Semáforo - INICIO***');
//     console.log('- Consultando pedido');

//     const {
//       light,
//       number
//     } = await req.json();

//     console.log(`- Pedido para #${number} color ${light || ' - '}`);
//     const led = new Gpio(Number(number), 'out');

//     console.log(`- Enviando pulso al GPIO #${number}`);
//     led.writeSync(1);

//     console.log('***Semáforo - FIN***');

//     if (loginUs && loginPs) {
//       return NextResponse.json(
//         { message: "Validado con éxito", validation: true },
//         { status: 200 }
//       );
//     } else {
//       return NextResponse.json(
//         { message: "Usuario o Contraseña incorrectos", validation: false },
//         { status: 404 }
//       );
//     };
//   } catch (e) {
//     return NextResponse.json(
//       { message: `Ha habido un error en la validación de datos: \n ${e.message}`, validation: false },
//       { status: 500 }
//     );
//   };
// };

export async function GET() {
  try {
    console.log('***Test de LEDs - INICIO***');
    PythonShell.run('./src/app/api/v1/lights/lightsTest.py', (err, results) => {
      if (err) throw err;
      console.log('Results: ', results);
    });
    // Para las "No integradas"
    // GPIO
    // 0, 2, 3, 4, 5, 25, 27
    // const led1 = new Gpio(Number(0), 'out');
    // const led2 = new Gpio(Number(2), 'out');
    // const led3 = new Gpio(Number(3), 'out');
    // const led4 = new Gpio(Number(4), 'out');
    // const led5 = new Gpio(Number(5), 'out');
    // const led6 = new Gpio(Number(25), 'out');
    // const led7 = new Gpio(Number(27), 'out');

    // GPIO placa rele Test:
    // GPIO 26 enciende Relay 1
    // GPIO 6 enciende Relay 2
    // GPIO 22 enciende Relay 3
    // GPIO 4 enciende Relay 4
    // GPIO placa rele a usar:
    // GPIO+ 17, 27, 5, 13

    // const ledOne = new Gpio(32, 'out'); // GPIO 26
    // const ledTwo = new Gpio(22, 'out'); // GPIO 6
    // const ledThree = new Gpio(31, 'out'); // GPIO 22
    // const ledFour = new Gpio(16, 'out'); // GPIO 4

    // const testPin = async (led) => {
    //   let stopBlinking = false;

    //   // Toggle the state of the LED connected to GPIO every 200ms
    //   const blinkLed = _ => {
    //     if (stopBlinking) {
    //       return led.unexport();
    //     }

    //     led.read()
    //       .then(value => led.write(value ^ 1))
    //       .then(_ => setTimeout(blinkLed, 200))
    //       .catch(err => console.log(err));
    //   };

    //   blinkLed();

    //   // Stop blinking the LED after 5 seconds
    //   setTimeout(_ => stopBlinking = true, 5000);
    //   return `${led} finalizado`
    // };

    // console.log(`- Enviando pulso al GPIO #26 (Relay 1)`);
    // console.log(await testPin(ledOne));

    // console.log(`- Enviando pulso al GPIO #6  (Relay 2)`);
    // console.log(await testPin(ledTwo));

    // console.log(`- Enviando pulso al GPIO #22 (Relay 3)`);
    // console.log(await testPin(ledThree));

    // console.log(`- Enviando pulso al GPIO #4  (Relay 4)`);
    // console.log(await testPin(ledFour));

    // process.on('SIGINT', _ => {
    //   ledOne.unexport();
    //   ledTwo.unexport();
    //   ledThree.unexport();
    //   ledFour.unexport();
    // });

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
