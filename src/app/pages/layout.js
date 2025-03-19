'use client'

import { useRouter } from "next/navigation";

import Img from "../components/shared/Img";
import Styles from './layout.module.css';
import "../globals.css";

export default function RootLayout({ children }) {
  const router = useRouter();

  const handleClick = () => {
    sessionStorage.removeItem('name');
    localStorage.removeItem('name');
    router.push('/pages/login');
  };

  return (
    <div className={Styles.layoutContainer}>
      <header className={Styles.layoutHeader}>
        <Img
          src={'/assets/images/logos/Apolo.png'}
          alt={"apolo-icon"}
          className={Styles.layoutHeaderLogo}
        />
        <Img
          src={'/assets/images/icons/Cerrar.png'}
          alt={"exit-icon"}
          className={(sessionStorage.getItem('name') || localStorage.getItem('name')) && Styles.layoutHeaderExit || Styles.layoutHeaderExitOff}
          onClick={handleClick}
        />
      </header>
      {children}
      <footer className={Styles.layoutFooter}>
        <Img src={'/assets/images/logos/Argos.png'} alt={"argos-icon"} />
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
        <p>PRODUCTO ACTIVADO</p>
      </footer>
    </div>
  );
}
