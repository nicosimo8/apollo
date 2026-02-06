import { NextResponse } from "next/server";
import { pool } from "@/utils/mysql";

export async function PUT() {
  try {
    const oldData = await pool.query('SELECT * FROM isLock WHERE id = 0;');

    let newLock = oldData[0][0];
    newLock.actualTime = new Date();

    if (newLock.firstStart) {
      newLock.timePass = Math.abs(new Date() - Math.abs(new Date(newLock.firstStart)));
      if (Math.abs(new Date(newLock.actualTime)) > (Math.abs(new Date(newLock.lockTime)))) {
        newLock.isLocked = true;
      } else {
        newLock.isLocked = false;
      }
    } else {
      newLock.firstStart = new Date();
      newLock.lockTime = new Date(newLock.firstStart);
      newLock.lockTime.setDate(newLock.lockTime.getDate() + 30)
    };

    const res = await pool.query('UPDATE isLock SET ? WHERE id = 0;', [newLock]);
    res

    const updData = await pool.query('SELECT * FROM isLock WHERE id = 0;');

    return NextResponse.json(updData[0]);
  } catch (e) {
    return NextResponse.json({ mesasge: e.message }, { status: 500 });
  };
};

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
