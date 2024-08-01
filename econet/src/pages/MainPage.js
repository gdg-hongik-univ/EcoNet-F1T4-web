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

export default function MainPage() {
  return (
    <MainContainer>
      <Logo>
        <LogoImg src={ecoImg} alt="로고이미지"></LogoImg>
        EcoNet
      </Logo>
    </MainContainer>
  );
}
