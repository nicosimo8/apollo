'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import data from '../config/config.json';
import { butLightGreen, butOffGreen, butLightRed, butOffRed } from './buttons.jsx';
import Styles from './main.module.css';

export default function Main() {
  const [configs, setConfigs] = useState(data);

  const router = useRouter();

  useEffect(() => {
    if (window) {
      if (!localStorage.getItem('name') && !sessionStorage.getItem('name')) {
        router.push('/pages/login');
      };
    };
  }, []);

  const changeConfig = async (config) => {
    const data = await fetch("/api/v1/configs", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });

    const res = await data.json();

    setConfigs(res.data);
  };

  const handleClick = async (id, number, led) => {
    let newConf = configs;
    if (number == 1) {
      configs.lights[id].light1 = !configs.lights[id].light1;
      await changeLed(led, configs.lights[id].light1);
    } else {
      configs.lights[id].light2 = !configs.lights[id].light2;
      await changeLed(led, configs.lights[id].light2);
    };
    await changeConfig(newConf);
  };

  const changeLed = async (led, onoff) => {
    switch (parseInt(led)) {
      case 1:
        led = parseInt(17);
        break;
      case 2:
        led = parseInt(27);
        break;
      case 3:
        led = parseInt(22);
        break;
      case 4:
        led = parseInt(23);
        break;
      case 5:
        led = parseInt(24);
        break;
      case 6:
        led = parseInt(25);
        break;
      case 7:
        led = parseInt(16);
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

  return <div className={Styles.mainContainer}>
    <div className={Styles.mainContainerLightsContainer}>
      {configs.lights.map((item, index) => {
        if (index < configs.lightsQuantity) {
          return (
            <div key={index}>
              {item.avaible && <div className={Styles.InnerLightsContainer}>
                <p>{item.name}</p>
                <div className={Styles.InnerLightsContainerButtons}>
                  <div onClick={() => handleClick(index, 1, (index + 1))}>
                    {item.light1 && butLightGreen || butOffGreen}
                  </div>
                  <div onClick={() => handleClick(index, 2, (index + 5))}>
                    {item.lights == 2 && (item.light2 && butLightRed || butOffRed)}
                  </div>
                </div>
              </div>}
            </div>
          );
        };
      })}
    </div>
    <button onClick={() => router.push('/pages/config')} className={Styles.mainContainerButton}>{"CONFIGURACIÓN"}</button>
  </div>
};
