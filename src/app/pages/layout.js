'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Img from "../components/shared/Img";
import Styles from './layout.module.css';
import "../globals.css";

import { licenceAuth } from "@/utils/auth.js"

export default function RootLayout({ children }) {
  const [lock, setLock] = useState(false);
  const [exit, setExit] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (window) {
      checkLock();
      setExit(sessionStorage.getItem("name") || localStorage.getItem("name"));
    };
  }, []);

  const checkLock = async () => {
    try {
      const auth = await licenceAuth();
      if (auth.validation) {
      } else {
        console.log(auth.message);
        setLock(true);
        await handleClick();
        alert('Su licencia ha Expirado! \n Contactenos!')
      };
    } catch (e) {
      console.log(e);
    };
  };

  const handleClick = async () => {
    sessionStorage.removeItem('name');
    localStorage.removeItem('name');
    const li = await changeConfig();
    await li.map((item, index) => {
      changeLed(index + 1, false);
      changeLed(index + 5, false);
    });
    router.push('/pages/login');
  };

  const changeConfig = async () => {
    const data = await fetch("/api/v2/configs/lights", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      }
    });

    const res = await data.json();

    await res.map(async (item, index) => {
      const c = await fetch(`/api/v2/configs/lights/${index}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        body: JSON.stringify({
          light1: false,
          light2: false
        })
      });
      c
    });

    return res;
  };

  const changeLed = async (led, onoff) => {
    switch (parseInt(led)) {
      case 1:
        led = parseInt(17);
        break;
      case 2:
        led = parseInt(22);
        break;
      case 3:
        led = parseInt(24);
        break;
      case 4:
        led = parseInt(16);
        break;
      case 5:
        led = parseInt(27);
        break;
      case 6:
        led = parseInt(23);
        break;
      case 7:
        led = parseInt(25);
        break;
      case 8:
        led = parseInt(26);
        break;
    };

    const data = await fetch('/api/v1/lights/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      body: JSON.stringify({ led, onoff })
    });

    const res = await data.json();

    console.log(res.message);
  };

  return (
    <div className={Styles.layoutContainer}>
      <header className={Styles.layoutHeader}>
        <Img
          src={'/assets/images/logos/Logo Apolo.png'}
          alt={"apolo-icon"}
          className={Styles.layoutHeaderLogo}
        />
        <Img
          src={'/assets/images/icons/Salir.png'}
          alt={"exit-icon"}
          className={exit && Styles.layoutHeaderExit || Styles.layoutHeaderExitOff}
          onClick={handleClick}
        />
      </header>
      {children}
      <footer className={Styles.layoutFooter}>
        <Img src={'/assets/images/logos/Logo Argos.png'} alt={"argos-icon"} />
        <div>
          <p>
            Apolo® es marca registrada de Argos Casilda S.A.S. Todos los derechos reservados.
          </p>
          <p>
            Administración y ventas comuníquese al 03464 15581698
          </p>
          <p>
            Servicio Post Ventas comuníquese al 03464 15689109
          </p>
        </div>
        <div className={Styles.layoutFooterActivated}>
          <p className={lock && Styles.layoutFooterActivatedOneRed || Styles.layoutFooterActivatedOne}>{lock && "PRODUCTO DESACTIVADO" || "PRODUCTO ACTIVADO"}</p>
          <p className={Styles.layoutFooterActivatedTwo}>Para más información <a href="argoscasilda@gmail.com">contáctenos</a>.</p>
        </div>
      </footer>
    </div>
  );
}
