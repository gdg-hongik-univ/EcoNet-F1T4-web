import EcoPartyIcon from "./EcoPartyIcon";
import styled from "styled-components";

import GreenPeace from "../assets/icons/Greenpeace_logo.svg.png";
import FriendOfEarth from "../assets/icons/Friends_of_the_Earth_logo.svg.png";
import WWF from "../assets/icons/WWF_logo_(Text_only).svg.png";

const EcoPartyListContainer = styled.div`
  display: flex;
  position: relative;
  bottom: 40px;
  gap: 24px;
  align-items: center;
`;

const Description = styled.p`
  font-weight: 600;
  font-size: 20px;
`;
// 환경소식 페이지 최하단에 있는 환경 단체 리스트
export default function EcoPartyList() {
  return (
    <EcoPartyListContainer>
      <Description>
        함께해요!
        <br /> 환경단체
      </Description>
      <EcoPartyIcon
        imgSrc={GreenPeace}
        partyName="그린피스"
        partyUrl={"https://www.greenpeace.org/korea/"}
      />
      <EcoPartyIcon
        imgSrc={FriendOfEarth}
        partyName={"지구의 벗"}
        partyUrl={"https://www.foei.org/"}
      />
      <EcoPartyIcon
        imgSrc={WWF}
        partyName={"세계자연기금"}
        partyUrl={"https://www.worldwildlife.org/"}
      />
    </EcoPartyListContainer>
  );
}
