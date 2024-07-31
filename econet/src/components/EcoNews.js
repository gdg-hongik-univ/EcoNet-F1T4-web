import styled from "styled-components";

const EcoNewsStyle = styled.div`
  display: flex;
  width: 640px;
  margin: 8px;
  padding: 16px;
  align-items: center;
  border: 1px solid #000000;
`;

const NewsImg = styled.img`
  width: 240px;
  height: 160px;
  border: 1px solid #000000;
`;
// 환경 뉴스 컴포넌트 {이미지, 본문, 공유 아이콘}
export default function EcoNews({ imgUrl, newsText = "뉴스 내용" }) {
  // 뉴스 이미지와 텍스트를 받는 prop 설정, 나중에 백엔드가 주는 데이터에 따라 변경 가능
  return (
    <EcoNewsStyle>
      <NewsImg src={imgUrl} alt="뉴스 이미지"></NewsImg>
      <p>{newsText}</p>
    </EcoNewsStyle>
  );
}
