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
      ledStatus();
      console.log(configs.lights)
      console.log(data.lights)
    };
  }, []);

  // const ledStatus = async () => {
  //   const data = await fetch("/api/v1/lights/status", {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   });

  //   const res = await data.json();

  //   console.log(res)
  // };

  const ledStatus = async () => {
    let newList = [];

    const data = await fetch("/api/v1/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 17 })
    });

    const data2 = await fetch("/api/v1/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 27 })
    });

    const data3 = await fetch("/api/v1/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 22 })
    });

    const data4 = await fetch("/api/v1/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 23 })
    });

    const data5 = await fetch("/api/v1/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 24 })
    });

    const data6 = await fetch("/api/v1/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 25 })
    });

    const data7 = await fetch("/api/v1/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 16 })
    });

    const data8 = await fetch("/api/v1/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 26 })
    });

    newList.push(await data.json());
    newList.push(await data2.json());
    newList.push(await data3.json());
    newList.push(await data4.json());
    newList.push(await data5.json());
    newList.push(await data6.json());
    newList.push(await data7.json());
    newList.push(await data8.json());

    console.log(newList)
    let newConf = configs;

    newList.map((item, index) => {
      switch (index) {
        case 0:
          if (item.data) {
            newConf.lights[0].light1 = (parseInt(item.data) === 1);
          }
          break;
        case 1:
          if (item.data) {
            newConf.lights[0].light2 = (parseInt(item.data) === 1);
          }
          break;
        case 2:
          if (item.data) {
            newConf.lights[1].light1 = (parseInt(item.data) === 1);
          }
          break;
        case 3:
          if (item.data) {
            newConf.lights[1].light2 = (parseInt(item.data) === 1);
          }
          break;
        case 4:
          if (item.data) {
            newConf.lights[2].light1 = (parseInt(item.data) === 1);
          }
          break;
        case 5:
          if (item.data) {
            newConf.lights[2].light2 = (parseInt(item.data) === 1);
          }
          break;
        case 6:
          if (item.data) {
            newConf.lights[3].light1 = (parseInt(item.data) === 1);
          }
          break;
        case 7:
          if (item.data) {
            newConf.lights[3].light2 = (parseInt(item.data) === 1);
          }
          break;
        default:
          console.log('No se asignaron configs');
          break;
      }
    });

    setConfigs(newConf);
    await changeConfig(newConf);
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

  const handleClick = async (id, number, led) => {
    let newConf = configs;
    if (number == 1) {
      newConf.lights[id].light1 = !newConf.lights[id].light1;
      await changeLed(led, newConf.lights[id].light1);
    } else {
      newConf.lights[id].light2 = !newConf.lights[id].light2;
      await changeLed(led, newConf.lights[id].light2);
    };
    setConfigs(newConf);
    await changeConfig(newConf);
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
                    {item.light1 && butLightRed || butOffRed}
                  </div>
                  <div onClick={() => handleClick(index, 2, (index + 5))}>
                    {item.lights == 2 && (item.light2 && butLightGreen || butOffGreen)}
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
