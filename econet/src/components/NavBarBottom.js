// CSS
import "../styles/navbar-bottom-styles.css";

// 하단의 약관 적혀있는 바
export default function NavBarBottom() {
  return (
    <div className="navbar-bottom">
      <button>개인정보처리방침</button>
      <button>약관</button>
      <button>저작권</button>
      <button>개발팀</button>
    </div>
  );
}
