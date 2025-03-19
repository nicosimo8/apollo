
import "./globals.css";

export const metadata = {
  title: "Apollo",
  description: "Herramienta de control",
};

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
