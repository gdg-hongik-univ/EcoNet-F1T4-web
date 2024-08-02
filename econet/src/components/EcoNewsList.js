import EcoNews from "./EcoNews";
import styled from "styled-components";

const EcoNewsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  border: 2px solid #000000;
`;
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
    <EcoNewsContainer>
      <EcoNews></EcoNews>
      <EcoNews></EcoNews>
      <EcoNews></EcoNews>
    </EcoNewsContainer>
  );
}
