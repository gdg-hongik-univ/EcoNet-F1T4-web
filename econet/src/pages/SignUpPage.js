import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignTitle from "../components/SignTitle";
import SignInput from "../components/SignInput";
import SignButton from "../components/SignButton";
import styles from "../styles/SignPage.module.css";
import { signupUser } from "../api/signup";

function SignUpPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordconfirm: "",
    nickname: "",
  });

  const [formError, setFormError] = useState("");

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((userInfo) => ({
      ...userInfo,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    if (!userInfo.email.includes("@") || !userInfo.email.includes(".")) {
      return setFormError("올바른 이메일 주소를 입력하세요.");
    }

    if (userInfo.password.length < 8) {
      return alert("비밀번호는 8자리 이상으로 해주세요");
    }

    if (userInfo.password !== userInfo.passwordconfirm) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다");
    }
<<<<<<< HEAD

=======
    
>>>>>>> f38ad5d0c7a2fdf7d6d99387068756ed92fdfc25
    try {
      await signupUser(userInfo.email, userInfo.password, userInfo.nickname);
      navigate("/signin"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 에러:", error.message);
      setFormError("회원가입 실패: 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  const isFormValid =
    userInfo.email.includes("@") &&
    userInfo.email.includes(".") &&
    userInfo.password.length >= 8 &&
    userInfo.password === userInfo.passwordconfirm &&
    userInfo.nickname.trim() !== "" &&
    userInfo.email.trim() !== "" &&
    userInfo.password.trim() !== "" &&
    userInfo.passwordconfirm.trim() !== "";

  return (
    <div className={styles.sign_box}>
      <SignTitle title="회원가입" />
      <form className={styles.sign_form} onSubmit={handleSubmit}>
        <SignInput
          type="email"
          content="이메일"
          value={userInfo.email}
          name="email"
          placeholder="이메일을 입력하세요"
          onChange={handleUserInfoChange} // onChange 핸들러 전달
        />
        <SignInput
          type="text"
          content="닉네임"
          value={userInfo.nickname}
          name="nickname"
          placeholder="닉네임을 입력하세요"
          onChange={handleUserInfoChange} // onChange 핸들러 전달
        />
        <SignInput
          type="password"
          content="비밀번호"
          value={userInfo.password}
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={handleUserInfoChange} // onChange 핸들러 전달
        />
        <SignInput
          type="password"
          content="비밀번호 확인"
          value={userInfo.passwordconfirm}
          name="passwordconfirm"
          placeholder="비밀번호를 입력하세요"
          onChange={handleUserInfoChange} // onChange 핸들러 전달
        />

        {formError && <p className={styles.error_message}>{formError}</p>}
        <SignButton title="가입완료" disabled={!isFormValid} />
      </form>
    </div>
  );
}

export default SignUpPage;
