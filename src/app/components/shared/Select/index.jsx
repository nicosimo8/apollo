import Styles from './select.module.css';

const Select = ({
  text,
  id,
  values,
  fakeVals,
  defaultValue,
  selected,
  placeHolder,
  readOnly,
  styleField,
  styleLabel,
  styleSelect,
  name,
  onChange,
}) => {

  return (
    <fieldset className={styleField}>
      <label htmlFor={id} className={styleLabel} >
        {text}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue || ''}
        placeholder={placeHolder || ''}
        readOnly={readOnly}
        className={Styles.input}
        onChange={onChange}
      >
        {values?.map((val, index) => {
          if ((Number(index) + 1) == Number(selected)) {
            return (
              <option key={index} value={val} selected={"selected"}>{(fakeVals && fakeVals[index]) || val}</option>
            );
          } else {
            return (
              <option key={index} value={val}>{(fakeVals && fakeVals[index]) || val}</option>
            );
          };
        })}
      </select>
    </fieldset>
  );
};

export default Select;