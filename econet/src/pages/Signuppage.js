import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignTitle from "../components/SignTitle";
import SignInput from "../components/SignInput";
import SignButton from "../components/SignButton";
import styles from "../styles/SignPage.module.css";

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

  const handleSuBmit = (e) => {
    e.preventDefault();

    if (userInfo.password.length < 8) {
      return alert("비밀번호는 8자리 이상으로 해주세요");
    }

    if (userInfo.password !== userInfo.passwordconfirm) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다");
    }
    //회원가입 정보 보냄
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
