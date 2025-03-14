import Img from "./components/shared/Img";
import "./globals.css";

export const metadata = {
  title: "Apollo",
  description: "Herramienta de control",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header>
          <p>APOLO</p>
          <p>{"[]"}</p>
        </header>
        {children}
        <footer>
          <p>ARGOS</p>
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
      </body>
    </html>
  );
}
