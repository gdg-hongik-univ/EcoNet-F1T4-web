import "../styles/mainpage-menu-button-styles.css";

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
