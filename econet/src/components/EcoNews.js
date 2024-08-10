import styled from "styled-components";
import VideoIcon from "../assets/icons/icons8-video-96.png";

const EcoNewsStyle = styled.div`
  display: flex;
  width: 1024px;
  height: auto;
  margin: 8px;
  padding: 8px;
  align-items: center;
  border: 1px solid #000000;
`;

const NewsImg = styled.img`
  width: 280px;
  height: 240px;
  margin: 12px;
  border: 1px solid #000000;
`;

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 320px;
`;

const NewsTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;

const NewsContent = styled.p`
  font-size: 16px;
`;

const NewsDate = styled.p`
  font-size: 20px;
  color: #555;
  margin-top: 8px;
`;

const NewsLink = styled.a`
  font-size: 20px;
  color: #1a0dab;
  margin-top: 8px;
  text-decoration: underline;

  &:hover {
    color: #d41b24;
  }
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
        <NewsTitle>{newsTitle}</NewsTitle>
        <NewsDate>작성일 : {date}</NewsDate>
        <NewsLink href={url} target="_blank" rel="noopener noreferrer">
          기사 읽기
        </NewsLink>
      </NewsContainer>
    </EcoNewsStyle>
  );
}
