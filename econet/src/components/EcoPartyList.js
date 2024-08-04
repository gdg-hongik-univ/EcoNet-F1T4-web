import EcoPartyIcon from "./EcoPartyIcon";
import styled from "styled-components";

const EcoPartyListContainer = styled.div`
  display: flex;
  margin: 16px 0 16px 16px;
  gap: 24px;
  align-items: center;
`;

const Description = styled.p`
  margin: 8px;
  font-weight: 600;
`;
// 환경소식 페이지 최하단에 있는 환경 단체 리스트
export default function EcoPartyList() {
  return (
    <EcoPartyListContainer>
      <Description>
        함께해요!
        <br /> 환경단체
      </Description>
      <EcoPartyIcon />
      <EcoPartyIcon />
      <EcoPartyIcon />
      <EcoPartyIcon />
      <EcoPartyIcon />
    </EcoPartyListContainer>
  );
}
