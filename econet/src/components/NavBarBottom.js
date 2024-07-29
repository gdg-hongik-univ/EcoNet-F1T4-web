// CSS
import styles from "../styles/navbar-bottom-styles.css";

/*
export default function NavBarBottom() {
  return (
    <div className={styles.navbarbottom}>
      <ul className={styles.links}>
        <li>개인정보 취급방침</li>
        <li>사용자 이용약관</li>
        <li>개발팀</li>
      </ul>
    </div>
  );
}
*/

import "../styles/navbar-bottom-styles.css";

// 하단의 약관 적혀있는 바
export default function NavBarBottom() {
  return (
    <div className="navbar-bottom">
      <button className="button-styles">개인정보처리방침</button>
      <button className="button-styles">약관</button>
      <button className="button-styles">저작권</button>
      <button className="button-styles">개발팀</button>
    </div>
  );
}
