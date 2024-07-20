// CSS
import { Link } from "react-router-dom";
import "../styles/navbar-styles.css";

// 상단의 네비게이션 바
export default function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">
        <button>에코넷</button>
      </Link>
      <div>
        <button>오늘의 환경</button>
        <button>게시판</button>
        <Link to="econews">
          <button>환경 뉴스</button>
        </Link>
        <button>배출함 위치</button>
      </div>
      <button>로그인</button>
      <button>회원가입</button>
    </div>
  );
}
