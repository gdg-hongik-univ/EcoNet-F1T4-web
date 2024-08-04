import * as React from "react";
import styled from "styled-components";
import StyledBoardList from "../styles/StyledBoardList";

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 열 정의
const columns = [
  {
    field: "topic",
    headerName: "모임주제",
    width: 150,
    sortable: false,
    resizable: false,
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "모임명",
    width: 150,
    sortable: false,
    resizable: false,
    cellClassName: "clickable",
    headerAlign: "center",
  },
  {
    field: "scope",
    headerName: "활동범위",
    width: 180,
    sortable: false,
    resizable: false,
    headerAlign: "center",
  },
  {
    field: "likes",
    headerName: "좋아요",
    type: "number",
    width: 100,
    sortable: false,
    resizable: false,
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "현황",
    width: 150,
    sortable: false,
    resizable: false,
    headerAlign: "center",
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
    topic: "Fitness Group",
    name: "Fit & Fun",
    scope: "Exercise & Wellness",
    likes: 120,
    status: "Active",
  },
  {
    id: 3,
    topic: "Cooking Class",
    name: "Master Chefs",
    scope: "Cooking & Recipes",
    likes: 80,
    status: "Inactive",
  },
  {
    id: 4,
    topic: "Tech Talks",
    name: "Tech Enthusiasts",
    scope: "Technology & Innovations",
    likes: 200,
    status: "Active",
  },
  {
    id: 5,
    topic: "Travel Buddies",
    name: "Wanderlust",
    scope: "Travel & Adventures",
    likes: 90,
    status: "Inactive",
  },
  {
    id: 6,
    topic: "Art Club",
    name: "Creative Minds",
    scope: "Art & Exhibitions",
    likes: 110,
    status: "Active",
  },
  {
    id: 7,
    topic: "Music Lovers",
    name: "Melody Makers",
    scope: "Music & Performances",
    likes: 140,
    status: "Active",
  },
  {
    id: 8,
    topic: "Language Exchange",
    name: "Global Speakers",
    scope: "Language Learning",
    likes: 75,
    status: "Active",
  },
  {
    id: 9,
    topic: "Gaming",
    name: "Game On",
    scope: "Video Games",
    likes: 160,
    status: "Inactive",
  },
];

export default function BoardList() {
  const handleCellClick = (params) => {
    // 클릭 가능한 셀의 열만 클릭 이벤트 처리
    if (params.field === "name") {
      alert(`Clicked on ${params.row.name}`);
    }
  };

  return (
    <Container>
      <h2>모임 게시판 - 목록</h2>
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
