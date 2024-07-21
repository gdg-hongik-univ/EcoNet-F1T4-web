import goldmedal from "../assets/gold-medal.png";
import silvermedal from "../assets/silver-medal.png";
import bronzemedal from "../assets/bronze-medal.png";
import styles from "../styles/BestClub.module.css";

const firstclub = "깔끔이들"; //불러오는 코드 추가
const secondclub = "";
const thirdclub = "";

function BestClub() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        우리 동네에서 이런 모임, 봉사 하고 있어요!
      </div>
      <div className={styles.ranking}>
        <div className={styles.rank}>
          <img src={goldmedal}></img>
          <div>{firstclub}</div>
        </div>
        <div className={styles.rank}>
          <img src={silvermedal}></img>
          <div>{secondclub}</div>
        </div>
        <div className={styles.rank}>
          <img src={bronzemedal}></img>
          <div>{thirdclub}</div>
        </div>
      </div>
    </div>
  );
}

export default BestClub;
