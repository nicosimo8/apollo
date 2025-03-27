'use client'

import { useRouter } from "next/navigation";
import data from './config/config.json';

import Img from "../components/shared/Img";
import Styles from './layout.module.css';
import "../globals.css";

export default function RootLayout({ children }) {
  const router = useRouter();

  const handleClick = async () => {
    sessionStorage.removeItem('name');
    localStorage.removeItem('name');
    await changeConfig(data);
    await data.lights.map((item, index) => {
      changeLed(index + 1, false);
      changeLed(index + 5, false);
    });
    router.push('/pages/login');
  };

  const changeConfig = async (config) => {
    let newConf = config;
    newConf.lights.forEach(item => {
      item.light1 = false;
      item.light2 = false;
    });

    const data = await fetch("/api/v1/configs", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newConf)
    });

    const res = await data.json();

    setConfigs(res.data);
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
      headers: { 'Content-Type': 'application/json' },
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
          className={Styles.layoutHeaderExit}
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
          <p className={Styles.layoutFooterActivatedOne}>{"PRODUCTO ACTIVADO"}</p>
          <p className={Styles.layoutFooterActivatedTwo}>Para más información <a href="argoscasilda@gmail.com">contáctenos</a>.</p>
        </div>
      </footer>
    </div>
  );
}
