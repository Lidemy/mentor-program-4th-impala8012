/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import styled from 'styled-components';
import FormInputs from './FormInputs';

const FormWrapper = styled.div`
  background-color: #ccc;
  display: flex;
  flex-direction: column;

  .container {
    margin: auto;
  }
`;

const FormInfo = styled.div`
  width: 645px;
  border-top: solid 6px #fad312;
  background-color: #fff;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  font-family: MicrosoftJhengHei;
  padding-left: 40px;
  margin-top: 120px;

  h1 {
    font-size: 36px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .event {
    font-size: 14px;
    margin-top: 10px;
  }
  .requiredNote {
    font-size: 16px;
    color: #e74149;
    margin-top: 22px;
  }
`;

const Footer = styled.div`
  width: 100%;
  font-size: 13px;
  color: #999999;
  text-align: center;
  background-color: #000000;
  border-top: solid 3px #fad312;
  padding: 20px 0;
  margin: 60px 0 0;
`;

const Form = () => (
  <FormWrapper>
    <div className="container">
      <FormInfo>
        <h1>新拖延運動報名表單</h1>
        <div className="event">
          <div>活動日期：2020/12/10 ~ 2020/12/11</div>
          <div>活動地點：台北市大安區新生南路二段1號</div>
        </div>
        <div className="requiredNote">* 必填</div>
        <FormInputs />
      </FormInfo>
    </div>
    <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
  </FormWrapper>
);

export default Form;
