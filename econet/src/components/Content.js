import React from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  flex: 1;
  padding: 30px 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1600px;
  margin: 72px auto 0;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 50px;
  color: #333;
  text-align: center;
`;

const Description = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #555;
  text-align: left;
`;

const Placeholder = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #888;
`;

const contentData = {
  battery: {
    title: "건전지",
    description:
      "건전지는 환경에 해로운 중금속을 포함하므로 별도로 배출해야 합니다. 대형 마트나 전자제품 매장에 있는 전지 수거함에 배출하거나, 지역의 재활용 센터를 이용하세요.",
  },
  small: {
    title: "소형가전",
    description:
      "소형가전은 대형 마트나 전자제품 매장에서 제공하는 소형가전 수거함에 배출하거나, 재활용 센터에 맡기세요. 제조사의 회수 프로그램도 확인해 보세요.",
  },
  lamp: {
    title: "형광등",
    description:
      "형광등은 수은이 포함되어 있어 환경에 유해하므로 전용 수거함에 배출해야 합니다. 대형 마트, 전자제품 매장, 재활용 센터에서 수거합니다.",
  },
  oil: {
    title: "식용유",
    description:
      "주방에서 쓰고 남은 폐식용유는 음식물 쓰레기로 분류되지 않으므로 유리병 등에 모아두었다가 폐식용유 수거함에 버려야 합니다. 만약 주변에 수거함이 없다면 신문지나 키친타월로 기름을 흡수해 일반 쓰레기로 배출해야 합니다.",
  },
  furniture: {
    title: "가구",
    description:
      "가구는 지역의 재활용 센터나 특별 수거 서비스를 이용하여 배출하세요. 여전히 사용할 수 있는 가구는 중고 거래 플랫폼을 활용할 수도 있습니다.",
  },
  medicine: {
    title: "의약품",
    description:
      "알약의 경우 포장지를 일반쓰레기로 버리고 알약만 따로 모아야 합니다. 가루약의 경우 포장지를 뜯지 않고 그대로 모아 배출하는 것이 좋습니다. 물약이나 시럽형으로 된 액체류는 병에 모아 새지 않게 밀봉해야 합니다. 또 연고와 안약, 코 스프레이, 천식 흡입제와 같이 특수 용기에 보관된 약은 용기 그대로 전용 수거함에 버리면 됩니다.",
  },
  clothes: {
    title: "의류",
    description:
      "의류수거함의 수거 품목을 확인하고 해당하는 품목을 넣습니다. 수거 금지 품목은 대형 폐기물 스티커를 붙여 버리거나 생활쓰레기 종량제 봉투에 넣어서 버려야 합니다.",
  },
  cigarette: {
    title: "담배꽁초",
    description:
      "불씨가 꺼졌는지 확인한 다음 일반쓰레기로 분류해 버리거나 전용 수거함에 넣습니다. 전용 수거함에는 담배꽁초 이외에는 버리면 안됩니다.",
  },
};

const Content = ({ selectedItem }) => {
  const content = contentData[selectedItem];

  return (
    <ContentContainer>
      {content ? (
        <>
          <Title>{content.title}</Title>
          <Description>{content.description}</Description>
        </>
      ) : (
        <Placeholder>눌러서 정보 확인!</Placeholder>
      )}
    </ContentContainer>
  );
};

export default Content;
