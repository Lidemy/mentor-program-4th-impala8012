/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import styled from 'styled-components';

const InputItem = styled.div`
  .required {
    color: black;
    &:after {
      content: " *";
      color: #e74149;
    }
  }
  .input__title {
    display: block;
    font-size: 20px;
    margin-top: 50px;
    color: black;
  }

  input {
    font-size: 16px;
    width: 287px;
    height: 23px;
    margin-top: 20px;
  }
  .radio {
    margin-bottom: 10px;
  }
  .signup__type {
    margin-top: 10px;
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
  }
  .check-box {
    width: 12px;
    height: 12px;
    margin-top: -2px;
    margin-bottom: -1px;
    vertical-align: middle;
    appearance: none;
    background-color: #bababa;
    outline: none;
    border-radius: 50%;
  }

  .check-box:checked {
    background-color: #000;
  }

  .suggest {
    font-size: 14px;
    margin-top: 12px;
  }
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  margin-top: 5px;
  color: red;
`;

const Input = ({
  question,
  value,
  placeholder,
  name,
  isError,
  suggest,
  required,
  handleChange,
}) => (
  <InputItem>
    <label
      className={required ? 'input__title required' : 'input__title'}
      htmlFor="name"
    >
      {question}
    </label>
    <div className="suggest">{suggest}</div>
    <input
      type="text"
      placeholder={placeholder}
      className="check"
      name={name}
      onChange={handleChange}
    />
    {isError && !value && (
      <ErrorMessage className="warning">
        請輸入
        {question}
      </ErrorMessage>
    )}
  </InputItem>
);

const RadioGroup = ({
  name,
  radiovalue,
  isError,
  handleRadioChange,
  required,
}) => (
  <InputItem>
    <div
      className={
        required ? 'input__title radio required' : 'input__title radio'
      }
    >
      {name}
    </div>
    <RadioButton
      label="躺在床上用想像力實作"
      value="imaginary"
      checked={radiovalue === 'imaginary'}
      radiovalue={radiovalue}
      handleRadioChange={handleRadioChange}
    />
    <RadioButton
      label="趴在地上滑手機找現成的"
      value="phone"
      checked={radiovalue === 'phone'}
      radiovalue={radiovalue}
      handleRadioChange={handleRadioChange}
    />
    {isError && !radiovalue && (
      <ErrorMessage className="warning">請填入報名類型</ErrorMessage>
    )}
  </InputItem>
);

const RadioButton = ({
  label,
  value,
  checked,
  radiovalue,
  handleRadioChange,
}) => (
  <div>
    <label className="signup__type">
      <input
        className="check-box"
        name="報名類型"
        type="radio"
        value={value}
        checked={checked}
        radiovalue={radiovalue}
        onChange={handleRadioChange}
      />
      {label}
    </label>
  </div>
);

export { Input, RadioGroup };
