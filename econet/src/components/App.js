import "./App.font.css"; // CSS 파일을 가장 먼저 임포트
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import NavBarBottom from "./NavBarBottom";
import styles from "./App.module.css";
import { logoutUser } from "../api/logout";
import { userState } from "../atom/userAtom";
import { isLoggedInState } from "../atom/atoms";

function App() {
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  // 로그인 상태를 복원하는 useEffect
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userInfo = JSON.parse(user);
      setUser(userInfo);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setUser, setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.detail === "Successfully logged out") {
        setIsLoggedIn(false); // 로그인 상태를 false로 설정
        setUser({}); // 사용자 정보를 초기화
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <>
      <NavBar className={styles.nav} handleLogout={handleLogout} />
      <div className={styles.body}>
        <Outlet />
      </div>
      <NavBarBottom className={styles.navbarbottom} />
    </>
  );
}

export default App;
