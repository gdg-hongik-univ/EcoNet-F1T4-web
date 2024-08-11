import React from "react";
import BoardList from "../components/BoardList"; // BoardList 컴포넌트 임포트
import "../styles/TodayPage.css"; // 스타일 시트 임포트
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
  margin-top: 120px;
  width: 1300px;
`;

function BoardListPage() {
  return (
    <ContentBox>
      <Title>모임 게시판 - 목록</Title>
      <BoardList />
    </ContentBox>
  );
}

export default BoardListPage;
