import Logo from "../components/Logo.js";
import MainPageMenuButton from "../components/MainPageMenuButton.js";
import "../styles/mainpage.css";

// images
import ecoImg from "../assets/mainpage-menu-ecoinfo.jpg";
import boardImg from "../assets/mainpage-menu-board.jpg";
import newsImg from "../assets/mainpage-menu-econews.jpg";
import mapImg from "../assets/mainpage-menu-map.jpg";

// CSS
import "../styles/mainpage.css";
import "../styles/mainpage-menu-button-styles.css";

export default function MainPage() {
  return (
    <div className="mainpage-container">
      <Logo />
      <div className="menu-button-box">
        <MainPageMenuButton name={"오늘의 환경"} imgSrc={ecoImg} />
        <MainPageMenuButton name={"게시판"} imgSrc={boardImg} />
        <MainPageMenuButton name={"환경뉴스"} imgSrc={newsImg} />
        <MainPageMenuButton name={"위치정보"} imgSrc={mapImg} />
      </div>
    </div>
  );
}
