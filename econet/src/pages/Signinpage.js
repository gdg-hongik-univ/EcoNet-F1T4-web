import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signtitle from "../components/Signtitle";
import Signinput from "../components/Signinput";
import Signbutton from "../components/Signbutton";
import "../styles/Sign.css";

function Signinpage() {
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

  //const navigate = useNavigate();

  // const goSignupPage = () => {
  //   navigate("/signup");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    //로그인 정보 받아옴
  };

  return (
    <div className="sign-box" onChange={handleUserInfoChange}>
      <Signtitle title="로그인" />
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
        <Signbutton title="로그인" disabled={!isInvalid} />
      </form>
      <button className="not-member">회원이 아니신가요?</button>
    </div>
  );
}

export default Signinpage;
