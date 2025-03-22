'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import data from './config.json';

import Input from '@/app/components/shared/Input';
import Styles from './config.module.css';
import Select from '@/app/components/shared/Select';
import Img from '@/app/components/shared/Img';

export default function Config() {
  const [lights, setLights] = useState([1, 2, 3, 4]);
  const [configs, setConfigs] = useState(data);

  const router = useRouter();

  const testLed = async () => {
    const data = await fetch('/api/v1/lights/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const res = await data.json();

    alert(res.message);
  };

  const changeConfig = async (config) => {
    const data = await fetch("/api/v1/configs", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });

    const res = await data.json();

    setConfigs(res.data);
  };

  const handleChange = async (e) => {
    let newConf = configs;
    if (e.target.name == 'lightsQuantity') {
      configs.lightsQuantity = parseInt(e.target.value);
    } else if (e.target.type == 'search') {
      configs.lights[e.target.name].name = e.target.value;
    } else {
      configs.lights[e.target.name].lights = parseInt(e.target.value);
    };
    await changeConfig(newConf);
  };

  const handleCheckChange = async (e) => {
    let newConf = configs;
    configs.lights[e.target.name].avaible = !configs.lights[e.target.name].avaible
    await changeConfig(newConf);
  };

  return (
    <div className={Styles.configContainer}>
      <div className={Styles.configTitleContainer}>
        <div className={Styles.configTitleContainerTitle}>
          <Img src={"/assets/images/icons/Configuracion.png"} />
          <h1>{"Configuración"}</h1>
        </div>
        <p>{"Si los casilleros quedan en blanco se mostrarán los valores  por defecto."}</p>
      </div>
      <div className={Styles.configContainerOpt}>
        <Select
          text={'Cantidad de semáforos'}
          defaultValue={configs.lightsQuantity}
          values={[1, 2, 3, 4]}
          onChange={handleChange}
          name={'lightsQuantity'}
        />
        <Select
          text={'Modo'}
          defaultValue={configs.lightsMode}
          values={[1, 2, 3, 4, 5, 6, 7, 8]}
          fakeVals={["1 enc", "2 enc", "3 enc", "4 enc", "5 enc", "6 enc", "7 enc", "Todos enc",]}
        />
      </div>
      <div className={Styles.configLightsContainer}>
        {lights.map((item, index) => {
          if (item > configs.lightsQuantity) {
            return
          } else {
            return (
              <div key={index} className={Styles.configLight}>
                <Input text={`Semáforo ${item}`} defaultValue={configs.lights[index].name} type={'search'} onChange={handleChange} name={index} />
                <Select text={"Luces"} defaultValue={configs.lights[index].lights} values={[1, 2]} type={'light'} onChange={handleChange} name={index} />
                <Select text={"Modo"} defaultValue={configs.lights[index].mode} values={[1, 2]} fakeVals={["1 enc", "2 enc"]} />
                <Input text={"Hab."} type='checkbox' checked={configs.lights[index].avaible} onChange={handleCheckChange} name={index} />
              </div>
            );
          }
        })}
      </div>
      <div className={Styles.configContainerButtons}>
        <button onClick={testLed} className={Styles.configContainerButton}>TEST</button>
        <button onClick={() => router.push('/pages/main')} className={Styles.configContainerButton}>VOLVER</button>
      </div>
    </div>
  );
};
