import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signtitle from "../components/Signtitle";
import Signinput from "../components/Signinput";
import Signbutton from "../components/Signbutton";

function Signuppage() {
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

  const handleSubmit = (e) => {
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
    <div className="sign-box" onChange={handleUserInfoChange}>
      <Signtitle title="회원가입" />
      <form className="sign-form" onSubmit={handleSubmit}>
        <Signinput
          type="email"
          content="이메일"
          value={userInfo.email}
          name="email"
          placeholder="이메일을 입력하세요"
        />
        <Signinput
          type="password"
          content="비밀번호"
          value={userInfo.password}
          name="password"
          placeholder="비밀번호를 입력하세요"
        />
        <Signinput
          type="password"
          content="비밀번호 재입력"
          value={userInfo.passwordconfirm}
          name="passwordconfirm"
          placeholder="비밀번호를 입력하세요"
        />
        <Signbutton title="가입완료" />
      </form>
    </div>
  );
}

export default Signuppage;
