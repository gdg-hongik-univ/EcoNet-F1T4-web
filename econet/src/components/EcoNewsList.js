import EcoNews from "./EcoNews";

// CSS
import "../styles/econewspage/econewspage-styles.css";

// 환경 뉴스를 담을 리스트
export default function EcoNewsList({ news }) {
  // map 메소드를 이용해서 return 할 예정
  //   return (
  //     <ul>
  //       {news.map(() => {
  //         return (
  //           <li>
  //             <EcoNews imgUrl={""} newsText={""} />
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  return (
    <div className="econews-list-style">
      <EcoNews></EcoNews>
      <EcoNews></EcoNews>
      <EcoNews></EcoNews>
      <EcoNews></EcoNews>
    </div>
  );
}
