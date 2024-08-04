import React, { useState } from "react";

import styled from "styled-components";
import ImageModal from "../components/ImageModal";
import LocationCommentList from "../components/LocationCommentList";
import LocationCommentInput from "../components/LocationCommentInput";

const MainBox = styled.div`
  width: 1000px;
  margin: 32px auto;
`;
const binName = "의류수거함";
const BinName = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 16px;
`;
const address = "서울시 마포구 와우산로 15";
const Address = styled.div`
  font-size: 20px;
  margin-bottom: 24px;
`;

const ImageFrame = styled.div`
  display: grid;
  grid-template:
    242px 242px /
    494px 242px 242px;
  gap: 11px;
  margin-bottom: 20px;
`;

const MainImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  grid-row: 1/3;
  grid-column: 1/2;
`;
const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const allowed = "의류, 신발, 일반가방, 담요, 누비이불, 커튼, 카펫";
const notallowed = "솜이불, 베개, 방석, 롤러스케이트, 바퀴가방 등";
const StyledLi = styled.li`
  font-size: 18px;
  margin: 8px 0;
`;

const LocationInfo = styled.div`
  margin-top: 64px;
  margin-bottom: 26px;
  font-size: 20px;
  font-weight: 600;
`;

const images = [
  {
    id: 1,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFZByGJ3g3AT7WGG9u2AkSvxsuDgpna_HcfA&s",
  },
  {
    id: 2,
    url: "https://www.shinailbo.co.kr/news/photo/202006/1293860_527296_5534.jpg",
  },
  {
    id: 3,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPFZ-uTBauJ-7oXFQlXPMYJR0YVcfm-x9og&s",
  },
  {
    id: 4,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThqcsEPtQH4AMFua8OB3iPxtXy98nS6FWbA&s",
  },
];

const comments = [
  {
    id: 1,
    content: "치킨집 맞은편에 있어요~",
  },
  {
    id: 2,
    content:
      "어디앞에서 횡단보도를 건너면 뭐가 보이는데 이제 거기서 오른쪽으로 한번 돌고 한 블럭 직진해서 왼쪽으로 돌고 그리고 어쩌고 저쩌고 뒤로 갔다가 앞으로 갔다가 어쩌고 저쩌고 뒤로 갔다가 앞으로 갔다가 어쩌고 저쩌고 뒤로 갔다가 앞으로 갔다가",
  },
  {
    id: 3,
    content: "위치를 설명하는 글",
  },
  {
    id: 4,
    content:
      "위치를 설명하고 있는 아주 긴 글 아주 긴 글 아무말 아무말 어어어어 아아아 가다다다 나나나 아아아 거거거 니니니 러러 다나다 갸이이 먀개악 내내갸 갸갸 내미다 애지지 댜내미 닌내갸다 아라",
  },
];

function BinInfoPage() {
  return (
    <MainBox>
      <BinName>{binName}</BinName>
      <Address>{address}</Address>
      <ImageFrame>
        <MainImage src={images[0].url} alt="이미지" />
        <StyledImage src={images[1].url} alt="이미지" />
        <StyledImage src={images[2].url} alt="이미지" />
        <StyledImage src={images[3].url} alt="이미지" />
        <ImageModal images={images} />
      </ImageFrame>
      <ul>
        <StyledLi>수거대상 품목: {allowed}</StyledLi>
        <StyledLi>수거불가 품목: {notallowed}</StyledLi>
      </ul>
      <LocationInfo>위치 정보</LocationInfo>
      <LocationCommentList comments={comments} />
      <LocationCommentInput />
    </MainBox>
  );
}

export default BinInfoPage;
