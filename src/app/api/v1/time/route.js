import { NextResponse } from "next/server";
import data from '@/../lock.json'
import fs from 'fs';

export async function GET(req) {
  try {
    let newLock = data;
    newLock.actualTime = new Date();

    if (newLock.firstStart) {
      newLock.timePass = Math.abs(new Date() - Math.abs(new Date(newLock.firstStart)));
      if (Math.abs(new Date(newLock.actualTime)) > (Math.abs(new Date(newLock.lockTime)))) {
        newLock.lock = true;
      } else {
        newLock.lock = false;
      }
    } else {
      newLock.firstStart = new Date();
      newLock.lockTime = new Date(newLock.firstStart);
      newLock.lockTime.setDate(newLock.lockTime.getDate() + 30)
    };

    fs.writeFileSync("./lock.json", JSON.stringify(newLock));

    return NextResponse.json(
      { message: "Consulta exitosa", data: data },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: `Ha habido un error en la consulta: \n ${e.message}` },
      { status: 500 }
    );
  };
};
