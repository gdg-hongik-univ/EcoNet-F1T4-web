import { useState } from "react";
import "../styles/Loginpage.css";

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div id="box">
      <div>
        <button id="back">{"<"}</button>
        <span id="login-title">로그인</span>
      </div>
      <form>
        <label htmlFor="username">아이디</label>
        <input
          id="username"
          value={username}
          onChange={handleUsernameChange}
        ></input>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          value={password}
          type="password"
          onChange={handlePasswordChange}
        ></input>
        <button id="login-button">로그인</button>
      </form>
      <button id="not-member">회원이 아니신가요?</button>
    </div>
  );
}

export default Loginpage;
