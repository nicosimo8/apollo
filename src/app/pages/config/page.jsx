'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/app/components/shared/Input';
import Styles from './config.module.css';
import Select from '@/app/components/shared/Select';
import Img from '@/app/components/shared/Img';

export default function Config() {
  const [lights, setLights] = useState([1, 2, 3, 4]);
  const [configs, setConfigs] = useState(
    {
      lightsQuantity: 1,
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

  useEffect(() => {
    if (window) {
      if (!localStorage.getItem('name') && !sessionStorage.getItem('name')) {
        router.push('/pages/login');
      } else {
        setTimeout(async () => {
          checkConfig();
        }, 1000);
      };
    };
  }, []);

  const router = useRouter();

  const testLed = async () => {
    const data = await fetch('/api/v2/lights/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const res = await data.json();

    alert(res.message);
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
        body: JSON.stringify(item)
      });
      const re = await dataLight.json();

      newLights.push(re);
    });

    const res = await data.json();
    function compareNumbers(a, b) {
      return a.id - b.id;
    };
    newLights.sort(compareNumbers);

    setConfigs({ ...configs, lights: newLights });
    setConfigs({ ...configs, lightsQuantity: res[0].lightsQuantity });
    setConfigs({ ...configs, lightsMode: res[0].lightsMode });
  };

  const handleChange = async (e) => {
    let newConf = configs;
    if (e.target.name == 'lightsQuantity') {
      newConf.lightsQuantity = parseInt(e.target.value);
    } else if (e.target.type == 'search') {
      if (e.target.value.length < 1) {
        newConf.lights[e.target.name].lightName = `Semáforo ${e.target.name}`;
      } else {
        newConf.lights[e.target.name].lightName = e.target.value;
      }
    } else {
      newConf.lights[e.target.name].lightsNumber = parseInt(e.target.value);
    };
    await changeConfig(newConf);
  };

  const checkConfig = async () => {
    try {
      const data = await fetch("/api/v2/configs/config", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const dataLights = await fetch("/api/v2/configs/lights", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!data.ok) {
        const res = await data.json();
        throw new Error(res.message);
      };

      if (!dataLights.ok) {
        const resLights = await dataLights.json();
        throw new Error(resLights.message);
      };

      const res = await data.json();
      const resLights = await dataLights.json();

      let newCon = configs;
      newCon.lights = resLights;
      newCon.lightsQuantity = res[0].lightsQuantity;
      newCon.lightsMode = res[0].lightsMode;
      await changeConfig(newCon);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckChange = async (e) => {
    let newConf = configs;
    newConf.lights[e.target.name].avaible = !newConf.lights[e.target.name].avaible
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
          selected={configs.lightsQuantity}
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
                <Input text={`Semáforo ${item}`} defaultValue={configs.lights[index].lightName} type={'search'} onChange={handleChange} name={index} />
                <Select text={"Luces"} defaultValue={configs.lights[index].lightsNumber} values={[1, 2]} type={'light'} onChange={handleChange} name={index} />
                <Select text={"Modo"} defaultValue={configs.lights[index].lightsMode} values={[1, 2]} fakeVals={["1 enc", "2 enc"]} />
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
