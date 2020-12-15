/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, RadioGroup } from './Input';

const FormInput = styled.form`
  .button {
    cursor: pointer;
    margin-top: 55px;
  }

  .button .submit__btn {
    width: 90px;
    height: 40px;
    font-size: 15px;
    background-color: #fad312;
    display: block;
    border-radius: 3px;
    border-style: none;
    margin-top: 0;
  }

  .note {
    font-size: 14px;
    padding: 21px 0 35px;
  }
`;

const FormInputs = () => {
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState({
    nickname: '',
    email: '',
    phone: '',
    event: '',
    other: '',
  });

  const [radioValue, setRadioValue] = useState('');
  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const {
    nickname, email, phone, event, other,
  } = value;

  const handleChange = (e) => {
    console.log(e.target.name);
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !email || !phone || !event || !radioValue) {
      return setIsError(true);
    }
    setIsError(false);
    setValue('');
  };

  return (
    <FormInput onSubmit={handleSubmit}>
      <Input
        question="暱稱"
        placeholder="您的回答"
        name="nickname"
        value={nickname}
        handleChange={handleChange}
        isError={isError}
        required
      />
      <Input
        question="電子郵件"
        placeholder="您的電子郵件"
        name="email"
        value={email}
        handleChange={handleChange}
        isError={isError}
        required
      />
      <Input
        question="手機號碼"
        placeholder="您的手機號碼"
        name="phone"
        value={phone}
        handleChange={handleChange}
        isError={isError}
        required
      />

      <RadioGroup
        name="報名類型"
        required
        value={radioValue}
        handleRadioChange={handleRadioChange}
        isError={isError}
        radiovalue={radioValue}
      />

      <Input
        question="怎麼知道這個活動的？"
        placeholder="您的回答"
        name="event"
        value={event}
        handleChange={handleChange}
        isError={isError}
        required
      />

      <Input
        question="其他"
        placeholder="您的回答"
        name="other"
        suggest="對活動的一些建議"
        value={other}
        handleChange={handleChange}
      />

      <div className="button">
        <input type="submit" className="submit__btn" />
      </div>
      <div className="note">請勿透過表單送出您的密碼。</div>
    </FormInput>
  );
};

export default FormInputs;
