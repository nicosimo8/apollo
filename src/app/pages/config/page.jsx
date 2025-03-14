
export default function Config() {
  /*
    Modos:
    Semáforo (1 encendida 2 apagadas)
    Semáforo inverso (1 apagada 2 encendidas)
    Semáforo Color (1 encendida usando los colores X/Y, 2 apagadas)
    Semáforo inverso Color (1 apagada 2 encendidas usando los colores X/Y)
    Biluminado (1 encendida Color X, 2 encendidas Color Y)
    Biluminado Inverso (1 encendida Color Y, 2 encendidas Color X)
    Triple (3 encendidas/apagadas)
    Triple Color (3 encendidas/apagadas usando los colores X/Y)
    Botonera (Pueden estar cualquier número de apagadas/encendidas)
    Botonera Color (Pueden estar cualquier número de apagadas/encendidas usando los colores X/Y)
  */
  return <h1>
    <div>
      <div>Config + dialogo</div>
      <div>
        <p>Input name</p>
        <p>Input select</p>
        <p>Input Checkbox</p>
      </div>
      <div>Agregar semáforo</div>
    </div>
    <button>Config</button>
  </h1>
};
