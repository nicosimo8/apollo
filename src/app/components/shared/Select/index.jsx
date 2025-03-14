import Styles from './select.module.css';

const Select = ({
  text,
  id,
  values,
  fakeVals,
  defaultValue,
  placeHolder,
  readOnly,
  styleField,
  styleLabel,
  styleSelect,
  name,
  error,
  register
}) => {

  const valiError = () => {
    if (error) {
      return Styles.error;
    }
    return Styles.good;
  };

  return (
    <fieldset className={ styleField }>
      <label htmlFor={ id } className={ styleLabel } >
        { text }
      </label>
      <select
        id={ id }
        name={ name }
        defaultValue={ defaultValue || '' }
        placeholder={ placeHolder || '' }
        readOnly={ readOnly }
        className={ valiError() }
        { ...register(name) }
      >
        {values?.map((val, index) => {
          return(
            <option key={ index } value={ val }>{ (fakeVals && fakeVals[index]) || val }</option>
          );
        })}
      </select>
      { error && <p> { error } </p> }
    </fieldset>
  );
};

export default Select;
