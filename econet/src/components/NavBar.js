import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState } from "../atom/atoms";
import { logoutUser } from "../api/logout";
import { Link, useNavigate } from "react-router-dom";

// Styled Components
const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const NavBarInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Brand = styled(Link)`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #58d7bc !important;
  position: relative;
  right: 120px;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 30px;
`;

const MenuItem = styled(Link)`
  margin: 8px;
  color: black;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    color: #6bddc4;
  }
`;

const AuthButtonContainer = styled.div`
  display: flex;
  margin: 0 16px;
  position: relative;
  left: 120px;
  gap: 20px;
`;

const AuthButton = styled(Link)`
  color: white;
  background-color: #58d7bc;
  text-decoration: none;
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    color: #ffffff;
  }
`;

const Button = styled.button`
  color: black;
  background-color: #58d7bc;
  border: none;
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
`;

// NavBar 컴포넌트
const NavBar = ({ className }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();

  // useEffect 추가: localStorage에서 토큰을 확인하고 로그인 상태를 설정
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <NavBarContainer className={className}>
      <NavBarInner>
        <Brand to="/">에코넷</Brand>
        <Menu>
          <MenuItem to="/today">오늘의 환경</MenuItem>
          <MenuItem to="/board">게시판</MenuItem>
          <MenuItem to="/econews">환경 뉴스</MenuItem>
          <MenuItem to="/location">배출함 위치</MenuItem>
        </Menu>
        <AuthButtonContainer>
          {isLoggedIn ? (
            <>
              <Button onClick={handleLogout}>로그아웃</Button>
              <AuthButton to="/mypage">마이페이지</AuthButton>
            </>
          ) : (
            <>
              <AuthButton to="/signin">로그인</AuthButton>
              <AuthButton to="/signup">회원가입</AuthButton>
            </>
          )}
        </AuthButtonContainer>
      </NavBarInner>
    </NavBarContainer>
  );
};

export default NavBar;
