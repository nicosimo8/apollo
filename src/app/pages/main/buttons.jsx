
import Styles from './main.module.css';

export const butOffGreen = (
  <div className={Styles.mainContainerRound}>
    <div className={Styles.mainContainerRoundInner}>
      <div className={Styles.mainContainerRoundInnerSquare}></div>
    </div>
  </div>
);

export const butLightGreen = (
  <div className={Styles.mainContainerRoundInverse}>
    <div className={Styles.mainContainerRoundInverseInner}>
      <div className={Styles.mainContainerRoundInverseInnerSquare}></div>
    </div>
  </div>
);

export const butOffRed = (
  <div className={Styles.mainContainerRoundRed}>
    <div className={Styles.mainContainerRoundRedInner}>
      <div className={Styles.mainContainerRoundRedInnerSquare}></div>
    </div>
  </div>
);

export const butLightRed = (
  <div className={Styles.mainContainerRoundRedInverse}>
    <div className={Styles.mainContainerRoundRedInverseInner}>
      <div className={Styles.mainContainerRoundRedInverseInnerSquare}></div>
    </div>
  </div>
);

// NEW BUTTONS
export const newButOffGreen = (
  <div className={Styles.buttonOffGreen}>
    <div className={Styles.barOffGreen}></div>
  </div>
);

export const newButOnGreen = (
  <div className={Styles.buttonOnGreen}>
    <div className={Styles.barOnGreen}></div>
  </div>
);

export const newButOffRed = (
  <div className={Styles.buttonOffRed}>
    <div className={Styles.barOffRed}></div>
  </div>
);

export const newButOnRed = (
  <div className={Styles.buttonOnRed}>
    <div className={Styles.barOnRed}></div>
  </div>
);
