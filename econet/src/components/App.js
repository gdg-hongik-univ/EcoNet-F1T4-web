import "./App.font.css"; // CSS 파일을 가장 먼저 임포트
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import NavBarBottom from "./NavBarBottom";
import styles from "./App.module.css";
import { logoutUser } from "../api/logout";
import { userState } from "../atom/userAtom";
import { isLoggedInState } from "../atom/atoms";

function App() {
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUser({
        id: null,
        email: null,
      });
      navigate("/signin"); // 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

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
