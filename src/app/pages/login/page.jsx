'use client'

import { useRouter } from 'next/navigation';

import Button from "@/app/components/shared/Button";
import Input from "@/app/components/shared/Input";

import Styles from "./login.module.css";

export default function Login() {

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const un = event.target.username.value;
    const ps = event.target.password.value;
    const ck = event.target.remember.checked;

    const login = await fetch('/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: un, password: ps })
    })

    const res = await login.json();

    if (res.validation) {
      if (ck) {
        localStorage.setItem('remember', true)
      } else {
        localStorage.setItem('remember', false)
      };
      localStorage.setItem('name', process.env.CUSTOMER_NAME)
      router.push('/pages/main');
    } else {
      alert(res.message);
    };
  };

  return <div className={Styles.mainLoginContainer}>
    <p className={Styles.mainLoginContainerText}>
      Para ingresar a <strong>Apolo®</strong> deberá colocar su nombre de
      Usuario y Contraseña asignado.
      Si usted no lo recuerda contáctenos.
    </p>
    <form onSubmit={handleSubmit} className={Styles.mainLoginForm}>
      <Input type={'text'} placeHolder={'Usuario'} name={'username'} />
      <Input type={'password'} placeHolder={'Contraseña'} name={'password'} />
      <div className={Styles.mainLoginFormButtons}>
        <Input type={'checkbox'} text={'Desea recordar?'} name={'remember'} />
        <Button text={'Enviar'} onClick={() => { }} />
      </div>
    </form>
  </div>
};
