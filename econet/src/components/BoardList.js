import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../atom/atoms";
import styled from "styled-components";
import StyledBoardList from "../styles/StyledBoardList";
import { gatheringPosts } from "../api/getboardlist";

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; // 부모 컨테이너의 너비를 100%로 설정
  max-width: 600px; // 필요한 경우 최대 너비를 설정
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
  { field: "id", headerName: "모임 번호", width: 70, ...commonColumnProps },
  {
    field: "subject",
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
    field: "activity_scope",
    headerName: "활동범위",
    width: 70,
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

export default function BoardList() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const isLoggedIn = useRecoilValue(isLoggedInState); // Recoil 상태 읽기

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [pageSize, setPageSize] = useState(50); // 페이지 크기
  const [totalCount, setTotalCount] = useState(0); // 전체 데이터 개수

  useEffect(() => {
    const gatherPosts = async () => {
      try {
        const { data, total } = await gatheringPosts(page, pageSize); // 페이지네이션 파라미터 추가
        setRows(data); // 데이터 상태에 설정
        setTotalCount(total); // 전체 데이터 개수 상태에 설정
      } catch (error) {
        console.error("Failed to gather posts:", error.message);
      }
    };

    gatherPosts();
  }, [page, pageSize]); // 페이지와 페이지 크기 변경 시 데이터 요청

  const handleCellClick = (params) => {
    if (params.field === "name") {
      // 클릭된 셀의 데이터를 사용하여 경로를 설정
      const { id } = params.row; // 행 데이터에서 id를 가져옴
      navigate(`/board/detail/${id}`); // `/board/detail/${id}` 경로로 이동
    }
  };

  const handleCreateButtonClick = () => {
    if (isLoggedIn) {
      navigate("/board/postmake");
    } else {
      alert("로그인 후 사용 가능합니다.");
    }
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
        getRowId={(row) => row.id}
        rowCount={totalCount}
        pageSize={pageSize}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onPageChange={(newPage) => setPage(newPage)}
        disableColumnMenu
        disableSelectionOnClick
        disableDensitySelector
        disableColumnSelector
        onCellClick={handleCellClick}
      />
    </Container>
  );
}
