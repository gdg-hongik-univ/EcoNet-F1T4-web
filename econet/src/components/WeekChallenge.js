import likebutton from "../assets/post-like.svg";
import goldmedal from "../assets/gold-medal.png";
import styles from "../styles/WeekChallenge.module.css";

function WeekChallenge() {
  //const {title,likes}=
  const title = "길에 버려진 쓰레기 줍기";
  const likenumber = 294;

  return (
    <div className={styles.box}>
      <img src={goldmedal} className={styles.goldmedal}></img>
      <div>이번주 챌린지:{title}</div>
      <div className={styles.likes}>
        <img src={likebutton} className={styles.likebutton}></img>
        <div className={styles.likenumber}>{likenumber}</div>
      </div>
    </div>
  );
}

export default WeekChallenge;
