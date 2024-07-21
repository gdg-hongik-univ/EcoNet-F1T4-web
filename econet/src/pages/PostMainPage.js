import WeekChallenge from "../components/WeekChallenge";
import BestClub from "../components/BestClub";
import ScrapPost from "../components/ScrapPost";
import styles from "../styles/PostMainPage.module.css";

function PostMainPage() {
  return (
    <div className={styles.box}>
      <WeekChallenge />
      <div className={styles.line1}>
        <BestClub />
        <ScrapPost />
      </div>
      <div className={styles.line2}>
        <button>내모임 게시판</button>
        <button>자유 게시판</button>
        <button>모임, 봉사 게시판</button>
        <button>챌린지 게시판</button>
      </div>
    </div>
  );
}

export default PostMainPage;
