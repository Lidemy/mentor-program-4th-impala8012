import React from "react";
import styled from "styled-components";

const Root =styled.div`
  width: 80%;
  margin: 0 auto;
`

const AboutContainer = styled.div`
  width:50%;
  height: 500px;
  display:flex;
  flex-direction:column;
  align-items:center;
  margin:0 auto;
  margin-top:30px;
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  background: rgba(0,0,0,0.1);
  border-radius: 15px;
`;
const AboutTitle = styled.div`
  font-size: 32px;
  font-weight:bolder;
  color: #333;
  margin-bottom: 10px;
`;

const AboutContent = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

export default function AboutPage() {
  return (
    <AboutContainer>
      <AboutTitle>關於我</AboutTitle>
      <AboutContent>利用 React 實作出的 SPA 部落格</AboutContent>
    </AboutContainer>
  );
}

