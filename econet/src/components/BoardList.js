import * as React from "react";
import styled from "styled-components";
import StyledBoardList from "../styles/StyledBoardList";

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; // 부모 컨테이너의 너비를 100%로 설정
  max-width: 700px; // 필요한 경우 최대 너비를 설정
  margin: auto; // 화면 가운데 정렬
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between; // 버튼을 오른쪽에 정렬하기 위해 space-between 사용
  align-items: center;
  position: relative;
  width: 100%;
  padding: 10px 0;
`;

const Title = styled.h2`
  margin: 0;
  flex-grow: 1;
  text-align: center; // 제목을 가운데 정렬
`;

const ButtonContainer = styled.div`
  flex-shrink: 0; // 버튼 컨테이너가 줄어들지 않도록 설정
`;

const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #58d7bc;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 600;
`;

const commonColumnProps = {
  sortable: false,
  resizable: false,
  headerAlign: "center",
  cellClassName: "centeredCell",
};

// 열 정의
const columns = [
  {
    field: "topic",
    headerName: "모임주제",
    width: 150,
    ...commonColumnProps,
  },
  {
    field: "name",
    headerName: "모임명",
    width: 150,
    ...commonColumnProps,
  },
  {
    field: "scope",
    headerName: "활동범위",
    width: 180,
    ...commonColumnProps,
  },
  {
    field: "likes",
    headerName: "좋아요",
    type: "number",
    width: 70,
    ...commonColumnProps,
  },
  {
    field: "status",
    headerName: "현황",
    width: 70,
    ...commonColumnProps,
  },
];

// 행 데이터
const rows = [
  {
    id: 1,
    topic: "Book Club",
    name: "Book Lovers",
    scope: "Reading & Discussions",
    likes: 150,
    status: "Active",
  },
  {
    id: 2,
    topic: "Book book",
    name: "Book Lovers",
    scope: "Reading & Discussions",
    likes: 150,
    status: "Active",
  },
];

export default function BoardList() {
  const handleCellClick = (params) => {
    if (params.field === "name") {
      alert(`클릭하면 모임 상세 페이지로 이동`);
      // navigate 함수 추가해야 함
    }
  };

  const handleCreateButtonClick = () => {
    alert("클릭하면 모임 만들기 페이지로 이동");
    // navigate 함수 추가해야 함
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>모임 게시판 - 목록</Title>
        <ButtonContainer>
          <CreateButton onClick={handleCreateButtonClick}>
            모임 만들기
          </CreateButton>
        </ButtonContainer>
      </HeaderContainer>
      <StyledBoardList
        rows={rows}
        columns={columns}
        getRowId={(row) => row.name} // ID 대신 name을 key로 사용
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSize={5}
        disableColumnMenu
        disableSelectionOnClick
        disableDensitySelector
        disableColumnSelector
        onCellClick={handleCellClick} // 클릭 이벤트 핸들러 추가
      />
    </Container>
  );
}
