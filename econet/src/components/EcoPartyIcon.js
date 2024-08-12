import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EcoPartyImg = styled.img`
  width: 80px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid #000000;
  object-fit: fill;
`;
// 환경 단체 아이콘 컴포넌트
// 백엔드 데이터에서 받아온 환경 단체 이미지 url을 prop으로 받아서 렌더링 하는 역할
export default function EcoPartyIcon({ imgSrc, partyName, partyUrl }) {
  const handleClick = () => {
    if (partyUrl) {
      window.open(partyUrl, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <EcoPartyImg
      src={imgSrc}
      alt={partyName}
      onClick={handleClick}
    ></EcoPartyImg>
  );
}
