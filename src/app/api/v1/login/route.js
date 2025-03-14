'use server'

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log('***Login - INICIO***');
    console.log('- Consultando credenciales');

    let loginUs = false;
    let loginPs = false;

    const {
      username,
      password
    } = await req.json();

    console.log('- 1/2');
    if (username === process.env.USERNAME_ONE || username === process.env.USERNAME_TWO || username === process.env.USERNAME_THREE) {
      loginUs = true;
    }

    console.log('- 2/2')
    if (password === process.env.PASSWORD_ONE || password === process.env.PASSWORD_TWO || password === process.env.PASSWORD_THREE) {
      loginPs = true;
    }

    console.log('***Login - FIN***');

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
