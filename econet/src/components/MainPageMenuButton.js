import "../styles/mainpage/mainpage-menu-button-styles.css";

// 메인페이지에서 가고 싶은 페이지로 클릭하면 이동하는 버튼
export default function MainPageMenuButton({ name, imgSrc }) {
  return (
    <div className="menu-button">
      <text>{name}</text>
      <img
        className="menu-button-img-style"
        src={imgSrc}
        alt="MainPageMenuImg"
      ></img>
    </div>
  );
}
