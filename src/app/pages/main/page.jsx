'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  newButOffGreen,
  newButOnGreen,
  newButOffRed,
  newButOnRed,
} from './buttons.jsx';
import Styles from './main.module.css';

export default function Main() {
  const [configs, setConfigs] = useState(
    {
      lightsQuantity: 0,
      lightsMode: 8,
      lights: [
        {
          lightName: "Semáforo 1",
          lightsNumber: 2,
          light1: false,
          light2: false,
          avaible: true,
          lightsMode: 1
        },
        {
          lightName: "Semáforo 2",
          lightsNumber: 2,
          light1: false,
          light2: false,
          avaible: true,
          lightsMode: 1
        },
        {
          lightName: "Semáforo 3",
          lightsNumber: 2,
          light1: false,
          light2: false,
          avaible: true,
          lightsMode: 1
        },
        {
          lightName: "Semáforo 4",
          lightsNumber: 2,
          light1: false,
          light2: false,
          avaible: true,
          lightsMode: 1
        }
      ]
    }
  );

  const router = useRouter();

  useEffect(() => {
    if (window) {
      if (!localStorage.getItem('name') && !sessionStorage.getItem('name')) {
        router.push('/pages/login');
      };
      ledStatus();
      checkLock();
    };
  }, []);

  const checkLock = async () => {
    try {
      const data = await fetch("/api/v2/time", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!data.ok) {
        const res = await data.json();
        throw new Error(res.message);
      }

      const res = await data.json();

      if (res[0].isLocked) {
        await handleClick();
        alert('Su licencia ha Expirado! \n Contactenos!')
      };
    } catch (e) {
      console.log(e);
    }
  };

  const ledStatus = async () => {
    let newList = [];
    let newConf = await checkConfig();

    newConf.lights.forEach(item => {
      item.light1 = false;
      item.light2 = false;
    });

    await changeConfig(newConf);

    const data = await fetch("/api/v2/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 17 })
    });

    const data2 = await fetch("/api/v2/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 27 })
    });

    const data3 = await fetch("/api/v2/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 22 })
    });

    const data4 = await fetch("/api/v2/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 23 })
    });

    const data5 = await fetch("/api/v2/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 24 })
    });

    const data6 = await fetch("/api/v2/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 25 })
    });

    const data7 = await fetch("/api/v2/lights/status", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ led: 16 })
    });

    const data8 = await fetch("/api/v2/lights/status", {
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

    newList.map(async (item, index) => {
      switch (index) {
        case 0:
          if (item.data) {
            newConf.lights[0].light1 = (parseInt(item.data) === 1);
          };
          break;
        case 1:
          if (item.data) {
            newConf.lights[0].light2 = (parseInt(item.data) === 1);
          };
          break;
        case 2:
          if (item.data) {
            newConf.lights[1].light1 = (parseInt(item.data) === 1);
          };
          break;
        case 3:
          if (item.data) {
            newConf.lights[1].light2 = (parseInt(item.data) === 1);
          };
          break;
        case 4:
          if (item.data) {
            newConf.lights[2].light1 = (parseInt(item.data) === 1);
          };
          break;
        case 5:
          if (item.data) {
            newConf.lights[2].light2 = (parseInt(item.data) === 1);
          };
          break;
        case 6:
          if (item.data) {
            newConf.lights[3].light1 = (parseInt(item.data) === 1);
          };
          break;
        case 7:
          if (item.data) {
            newConf.lights[3].light2 = (parseInt(item.data) === 1);
          };
          break;
        default:
          console.log('No se asignaron configs');
          break;
      };
    });

    await changeConfig(newConf);
  };

  const checkConfig = async () => {
    const data = await fetch("/api/v2/configs/config", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const dataLights = await fetch("/api/v2/configs/lights", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const res = await data.json();
    const resLights = await dataLights.json();

    setConfigs({ ...configs, lights: resLights });
    setConfigs({ ...configs, lightsQuantity: res[0].lightsQuantity });
    setConfigs({ ...configs, lightsMode: res[0].lightsMode });
    let newCon = configs;
    newCon.lights = resLights;
    newCon.lightsQuantity = res[0].lightsQuantity;
    newCon.lightsMode = res[0].lightsMode;
    return newCon;
  };

  const changeConfig = async (config) => {
    const newLights = [];

    const data = await fetch("/api/v2/configs/config", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lightsQuantity: config.lightsQuantity,
        lightsMode: config.lightsMode
      })
    });

    await config.lights.map(async (item, index) => {
      const dataLight = await fetch(`/api/v2/configs/lights/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.lights[index])
      });
      const re = await dataLight.json();

      newLights.push(re);
    });

    const res = await data.json();

    setConfigs({ ...configs, lights: newLights });
    setConfigs({ ...configs, lightsQuantity: res[0].lightsQuantity });
    setConfigs({ ...configs, lightsMode: res[0].lightsMode });
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

    const data = await fetch('/api/v2/lights/', {
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
                <p>{item.lightName}</p>
                <div className={Styles.InnerLightsContainerButtons}>
                  <div onClick={() => handleClick(index, 1, (index + 1))}>
                    {item.light1 && newButOnRed || newButOffRed}
                  </div>
                  <div onClick={() => handleClick(index, 2, (index + 5))}>
                    {item.lightsNumber == 2 && (item.light2 && newButOnGreen || newButOffGreen)}
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
