import { Link } from "react-router-dom";
// images
import ecoImg from "../assets/mainpage-menu-ecoinfo.jpg";

import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 로고 이미지
const LogoImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 16px;
`;
// EcoNet 로고
const Logo = styled.text`
  font-size: 80px;
  color: #56d8bc;
  margin: 80px 0 160px;
  ${LogoImg} {
    margin-right: 8px;
  }
`;

const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Introduction = styled.h2`
  font-size: 48px;
  font-weight: 700;
  color: #6bddc4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(0, 0, 0, 0.3);
  margin: 20px 0;
`;

export default function MainPage() {
  return (
    <MainContainer>
      <Logo>
        <LogoImg src={ecoImg} alt="로고이미지"></LogoImg>
        EcoNet
      </Logo>
      <IntroductionContainer>
        <Introduction>
          환영합니다!
          <br />
          <br />
          서로 힘을 합쳐 <br />
          <br />
          우리의 지구를 지켜요.
          <br />
          <br />
        </Introduction>
      </IntroductionContainer>
    </MainContainer>
  );
}
