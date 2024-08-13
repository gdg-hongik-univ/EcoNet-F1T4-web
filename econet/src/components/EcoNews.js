import styled from "styled-components";
import VideoIcon from "../assets/icons/icons8-video-96.png";

const EcoNewsStyle = styled.div`
  display: flex;
  width: 720px;
  height: auto;
  margin: 8px;
  align-items: center;
  border: 1px solid #000000;
`;

const NewsImg = styled.img`
  width: 120px;
  height: 120px;
  margin: 12px;
  border: 1px solid #000000;
  object-fit: cover;
`;

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
`;

const NewsTitle = styled.a`
  font-size: 24px;
  font-weight: 700;
  &:hover {
    color: #6bddc4;
  }
`;

const NewsDate = styled.p`
  font-size: 20px;
  color: #555;
  margin-top: 8px;
`;

export default function EcoNews({ imgUrl, newsTitle, newsText, date, url }) {
  return (
    <EcoNewsStyle>
      {imgUrl === "" ? (
        <NewsImg src={VideoIcon} alt="뉴스 이미지" />
      ) : (
        <NewsImg src={imgUrl} alt="뉴스 이미지" />
      )}
      <NewsContainer>
        <NewsTitle href={url} target="_blank" rel="noopener noreferrer">
          {newsTitle}
        </NewsTitle>
        <NewsDate>작성일 : {date}</NewsDate>
      </NewsContainer>
    </EcoNewsStyle>
  );
}
