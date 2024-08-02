import styled from "styled-components";

const EcoPartyImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid #000000;
`;
// 환경 단체 아이콘 컴포넌트
// 백엔드 데이터에서 받아온 환경 단체 이미지 url을 prop으로 받아서 렌더링 하는 역할
export default function EcoPartyIcon({ imgSrc }) {
  return <EcoPartyImg src={imgSrc} alt="환경 단체 이미지"></EcoPartyImg>;
}
