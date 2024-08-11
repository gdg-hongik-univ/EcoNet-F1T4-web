import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SignTitle.module.css";

function SignTitle({ title }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleBackButtonClick = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <>
      <button className={styles.sign_back} onClick={handleBackButtonClick}>
        {"<"}
      </button>
      <span className={styles.sign_title}>{title}</span>
    </>
  );
}

export default SignTitle;
