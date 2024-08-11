import React from "react";
import "../styles/TodayPage.css";
import DustInfo from "../components/DustInfo.js";
import styled from "styled-components";

const Title = styled.div`
  position: absolute;
  top: -85px;
  left: 300px;
  font-size: 20px;
  font-weight: 500;
`;

const ContentBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 120px auto;
  width: 90%; /* 부모 요소의 90% 너비를 차지 */
  max-width: 1300px; /* 최대 너비 설정 */
`;

function TodayPage() {
  return (
    <ContentBox>
      <Title>오늘의 환경 정보</Title>
      <DustInfo />
    </ContentBox>
  );
}
export default TodayPage;
