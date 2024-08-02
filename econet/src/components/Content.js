import React from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1440px;
  margin: 72px auto 0;
`;

const Title = styled.h1`
  font-size: 3em;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Description = styled.p`
  font-size: 2em;
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
