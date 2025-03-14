import styles from './button.module.css';

const Button = ({ style, onClick, text, type }) => {

  return (
    <button
      type={ type }
      className={ style }
      onClick={ onClick || (() => {}) }
    >
      { text }
    </button>
  );
};

export default Button;
