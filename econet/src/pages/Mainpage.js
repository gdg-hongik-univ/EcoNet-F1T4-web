import Logo from "../components/Logo.js";
import MainPageMenuButton from "../components/MainPageMenuButton.js";
import "../styles/mainpage/mainpage.css";
import { Link } from "react-router-dom";
// images
import ecoImg from "../assets/mainpage-menu-ecoinfo.jpg";
import boardImg from "../assets/mainpage-menu-board.jpg";
import newsImg from "../assets/mainpage-menu-econews.jpg";
import mapImg from "../assets/mainpage-menu-map.jpg";

// CSS
import "../styles/mainpage/mainpage.css";

export default function Mainpage() {
  return (
    <div className="mainpage-container">
      <Logo />
      <div className="menu-button-box">
        <Link to="today">
          <MainPageMenuButton name={"오늘의 환경"} imgSrc={ecoImg} />
        </Link>
        <Link to="post">
          <MainPageMenuButton name={"게시판"} imgSrc={boardImg} />
        </Link>
        <Link to="econews">
          <MainPageMenuButton name={"환경뉴스"} imgSrc={newsImg} />
        </Link>
        <Link to="location">
          <MainPageMenuButton name={"배출함 위치"} imgSrc={mapImg} />
        </Link>
      </div>
    </div>
  );
}
