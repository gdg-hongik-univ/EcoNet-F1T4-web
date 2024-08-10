import EcoNews from "./EcoNews";
import styled from "styled-components";

const EcoNewsContainer = styled.div`
  display: flex;
  gap: 8px;
  height: 720px;
  flex-direction: column;
  align-items: center;
  border: 2px solid #000000;
  overflow-y: scroll; // 내용이 넘칠 경우 스크롤
`;

export default function EcoNewsList({ news }) {
  return (
    <EcoNewsContainer>
      {news.map((article) => (
        <EcoNews
          key={article.id}
          imgUrl={article.image_url || ""} // 이미지 URL을 전달. 없을 경우 빈 문자열 전달.
          newsTitle={article.title}
          date={article.date}
          url={article.url}
        />
      ))}
    </EcoNewsContainer>
  );
}
