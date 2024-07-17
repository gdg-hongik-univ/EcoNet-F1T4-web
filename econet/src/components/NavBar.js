// CSS
import "../styles/navbar-styles.css";

export default function NavBar() {
  const handleMainPageClick = () => {
    // TODO navigate to MainPage
  };

  const handleTodayEnvironmentClick = () => {
    // TODO navigate to 오늘의 환경 page
  };
  const handleBoardClick = () => {
    // TODO navigate to 게시판 page
  };
  const handleEcoNewsClick = () => {
    // TODO navigate to 환경뉴스 page
  };
  const handleMapClick = () => {
    // TODO navigate to 배출함 위치 page
  };

  const handleLoginClick = () => {
    // TODO navigate to 로그인 page
  };
  const handleSignUpClick = () => {
    // TODO navigate to 회원가입 page
  };

  return (
    <div className="navbar">
      <button onClick={handleMainPageClick}>에코넷</button>
      <div>
        <button onClick={handleTodayEnvironmentClick}>오늘의 환경</button>
        <button onClick={handleBoardClick}>게시판</button>
        <button onClick={handleEcoNewsClick}>환경 뉴스</button>
        <button onClick={handleMapClick}>배출함 위치</button>
      </div>
      <button onClick={handleLoginClick}>로그인</button>
      <button onClick={handleSignUpClick}>회원가입</button>
    </div>
  );
}
