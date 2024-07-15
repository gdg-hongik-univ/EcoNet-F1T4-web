import { useState } from "react";

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
    <>
      <div>
        <button>{"<"}</button>
        로그인
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
        <button>로그인</button>
      </form>
    </>
  );
}

export default Loginpage;
