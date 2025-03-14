'use client'

import Styles from './main.module.css';

export default function Main() {

  const testLed = async () => {
    const data = await fetch('/api/v1/lights/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const res = await data.json();

    alert(res.message);
  };

  return <div className={Styles.mainContainer}>
    <div>
      <div>
        <p>Semáforo 1</p>
        <div className={Styles.mainContainerRound}>
          <div className={Styles.mainContainerRoundInner}>
            <div className={Styles.mainContainerRoundInnerSquare}></div>
          </div>
        </div>
      </div>
    </div>
    <button onClick={testLed}>TEST</button>
  </div>
};
