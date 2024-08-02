import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignTitle from "../components/SignTitle";
import SignInput from "../components/SignInput";
import SignButton from "../components/SignButton";
import styles from "../styles/SignPage.module.css";
import { api } from "../api";

function SignUpPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordconfirm: "",
  });

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((userInfo) => ({
      ...userInfo,
      [name]: value,
    }));
  };

  //const navigate = useNavigate();

  // const goSignuppage = () => {
  //   navigate("/signup");
  // };

  const handleSuBmit = async (e) => {
    e.preventDefault();

    const { email, password } = userInfo;
    //회원가입 정보 보냄
    await api.post("/users/signup/", {
      email,
      password,
    });

    // 회원가입 성공 시 자동으로 마이페이지로 이동
    await api.post(
      "/mypage",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    // 비밀번호 에러 처리
    if (userInfo.password.length < 8) {
      return alert("비밀번호는 8자리 이상으로 해주세요");
    }

    if (userInfo.password !== userInfo.passwordconfirm) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다");
    }
  };

  return (
    <div className={styles.sign_box} onChange={handleUserInfoChange}>
      <SignTitle title="회원가입" />
      <form className={styles.sign_form} onSubmit={handleSuBmit}>
        <SignInput
          type="email"
          content="이메일"
          value={userInfo.email}
          name="email"
          placeholder="이메일을 입력하세요"
        />
        <SignInput
          type="password"
          content="비밀번호"
          value={userInfo.password}
          name="password"
          placeholder="비밀번호를 입력하세요"
        />
        <SignInput
          type="password"
          content="비밀번호 확인"
          value={userInfo.passwordconfirm}
          name="passwordconfirm"
          placeholder="비밀번호를 입력하세요"
        />
        <SignButton title="가입완료" />
      </form>
    </div>
  );
}

export default SignUpPage;
