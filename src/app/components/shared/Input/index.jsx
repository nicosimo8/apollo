import Styles from './input.module.css';

const Input = ({
  type,
  text,
  id,
  defaultValue,
  value,
  placeHolder,
  readOnly,
  styleField,
  styleLabel,
  styleInput,
  name,
  error,
  register,
  onChange
}) => {

  return (
    <fieldset className={styleField}>
      <label htmlFor={id} className={styleLabel} >
        {text}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue || ''}
        value={value || null}
        placeholder={placeHolder || ''}
        readOnly={readOnly}
        onChange={onChange}
      >
      </input>
      {error && <p> {error} </p>}
    </fieldset>
  );
};

export default Input;
