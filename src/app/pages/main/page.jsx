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

  const handleClick = async (id, number) => {
    let newConf = configs;
    if (number == 1) {
      configs.lights[id].light1 = !configs.lights[id].light1;
    } else {
      configs.lights[id].light2 = !configs.lights[id].light2;
    };
    await changeConfig(newConf);
    await changeLed(id + 1, configs.lights[id].light1);
  };

  const changeLed = async (number, onoff) => {
    switch (number) {
      case 1:
        number = parseInt(26);
        break;
      case 2:
        number = parseInt(6);
        break;
      case 3:
        number = parseInt(22);
        break;
      case 4:
        number = parseInt(4);
        break;
      case 5:
        number = parseInt(26);
        break;
      case 6:
        number = parseInt(6);
        break;
      case 7:
        number = parseInt(22);
        break;
      case 8:
        number = parseInt(4);
        break;
    };

    const data = await fetch('/api/v1/lights/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, onoff })
    });

    const res = await data.json();

    console.log(res.message);
  };

  return <div className={Styles.mainContainer}>
    <div className={Styles.mainContainerLightsContainer}>
      {configs.lights.map((item, index) => {
        return (
          <div key={index}>
            {item.avaible && <div className={Styles.InnerLightsContainer}>
              <p>{item.name}</p>
              <div className={Styles.InnerLightsContainerButtons}>
                <div onClick={() => handleClick(index, 1)}>
                  {item.light1 && butLightGreen || butOffGreen}
                </div>
                <div onClick={() => handleClick(index, 2)}>
                  {item.lights == 2 && (item.light2 && butLightRed || butOffRed)}
                </div>
              </div>
            </div>}
          </div>
        );
      })}
    </div>
    <button onClick={() => router.push('/pages/config')}>CONFIG</button>
  </div>
};
