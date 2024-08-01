import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Link를 사용하여 내비게이션을 처리합니다.

// Styled Components
const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white; /* 네비게이션 바 배경색 흰색으로 설정 */
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05); /* 약간의 그림자 추가 */
`;

const NavBarInner = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px; /* 좌우 여백 추가 */
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #58d7bc; /* 브랜드 텍스트 색상 */
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 30px; /* 메뉴 항목 간의 간격 조정 */
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: none;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 20px; /* 로그인 및 회원가입 버튼 간의 간격 조정 */
`;

const AuthButton = styled(Link)`
  color: ${({ isSignup }) =>
    isSignup ? "#58D7BC" : "white"}; /* 회원가입 버튼만 초록색 */
  background-color: ${({ isSignup }) =>
    isSignup ? "white" : "#58D7BC"}; /* 회원가입 버튼만 흰색 배경 */
  text-decoration: none;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
`;
// NavBar 컴포넌트
const NavBar = () => {
  return (
    <NavBarContainer>
      <NavBarInner>
        <Brand to="/">에코넷</Brand>
        <Menu>
          <MenuItem to="/today">오늘의 환경</MenuItem>
          <MenuItem to="/board">게시판</MenuItem>
          <MenuItem to="/econews">환경 뉴스</MenuItem>
          <MenuItem to="/location">배출함 위치</MenuItem>
        </Menu>
        <AuthButtons>
          <AuthButton to="/signin">로그인</AuthButton>
          <AuthButton to="/signup">회원가입</AuthButton>
        </AuthButtons>
      </NavBarInner>
    </NavBarContainer>
  );
};

export default NavBar;
