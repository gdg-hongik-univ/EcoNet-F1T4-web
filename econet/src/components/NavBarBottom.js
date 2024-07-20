// CSS
import styles from "../styles/navbar-bottom-styles.css";

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
