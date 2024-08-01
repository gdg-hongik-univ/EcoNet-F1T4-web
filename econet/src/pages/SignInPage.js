import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignTitle from "../components/SignTitle";
import SignInput from "../components/SignInput";
import SignButton from "../components/SignButton";
import styles from "../styles/SignPage.module.css";
import { signinUser } from "../api/signin";

function SignInPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((userInfo) => ({
      ...userInfo,
      [name]: value,
    }));
  };

  const isInvalid =
    userInfo.email.includes("@") &&
    userInfo.email.includes(".") &&
    userInfo.password.length >= 8;

  const navigate = useNavigate();

  const goSignUpPage = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signinUser(userInfo.email, userInfo.password);
      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error.message);
      alert("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className={styles.sign_box}>
      <SignTitle title="로그인" />
      <form className={styles.sign_form} onSubmit={handleSubmit}>
        <SignInput
          type="email"
          content="이메일"
          value={userInfo.email}
          name="email"
          placeholder="이메일을 입력하세요"
          onChange={handleUserInfoChange}
        />
        <SignInput
          type="password"
          content="비밀번호"
          value={userInfo.password}
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={handleUserInfoChange}
        />
        <SignButton title="로그인" disabled={!isInvalid} />
      </form>
      <button onClick={goSignUpPage} className={styles.not_member}>
        회원이 아니신가요?
      </button>
    </div>
  );
}

export default SignInPage;
