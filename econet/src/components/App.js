import "./App.font.css"; // CSS 파일을 가장 먼저 임포트
import React from "react";
import { useSetRecoilState } from "recoil";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import NavBarBottom from "./NavBarBottom";
import styles from "./App.module.css";
import { logoutUser } from "../api/logout";
import { isLoggedInState } from "../recoil/atoms";

function App() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
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
