import * as React from "react";
import StyledBoardList from "../styles/StyledBoardList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../atom/atoms";
import styled from "styled-components";
import { gatheringPosts } from "../api/getboardlist";

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
  width: 100%; // 컨테이너의 너비를 100%로 설정
  padding: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
  width: 100%; /* 버튼 컨테이너가 HeaderContainer의 전체 너비를 차지하도록 설정 */
  margin-bottom: 5px; /* 아래쪽 여백 */
`;

const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: transparent; /* 버튼 배경 색상 */
  color: #58d7bc; /* 텍스트 색상 */
  border: 1px solid #58d7bc; /* 버튼 외곽선 색상 */
  border-radius: 5px; /* 버튼 테두리 둥글기 */
  cursor: pointer; /* 커서 모양 */
  font-size: 600; /* 폰트 크기 */
  position: relative; /* ::after pseudo-element를 사용할 때 필요 */
  overflow: hidden; /* ::after pseudo-element가 버튼을 넘지 않도록 설정 */
  transition: color 0.3s, border-color 0.3s, background-color 0.3s; /* 트랜지션 설정 */

  /* 버튼에 hover 효과 추가 */
  &:hover {
    color: white;
    background-color: #58d7bc; /* hover 시 배경 색상 변경 */
  }

  /* 클릭 시 효과를 추가하기 위해 ::after pseudo-element 사용 */
  &:active::after {
    content: ""; /* 내용 없음 */
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%; /* 오버레이의 크기를 설정 */
    height: 300%;

    border-radius: 50%; /* 둥근 형태로 설정 */
    transform: translate(
      -50%,
      -50%
    ); /* 오버레이를 버튼의 중앙에 위치하도록 설정 */
    transition: opacity 0.3s; /* 오버레이의 투명도 변화에 대한 트랜지션 설정 */
    opacity: 0; /* 초기 상태에서 오버레이 숨기기 */
    pointer-events: none; /* 오버레이가 클릭 이벤트를 차단하지 않도록 설정 */
  }

  /* 클릭 시 오버레이 효과를 보이게 하기 위해 ::after pseudo-element의 opacity 설정 */
  &:active {
    color: #fff; /* 클릭 시 텍스트 색상 변경 */
  }

  &:active::after {
    opacity: 1; /* 클릭 시 오버레이 보이도록 설정 */
  }

  &:focus {
    outline: none;
  }
`;

const commonColumnProps = {
  sortable: false,
  resizable: false,
  headerAlign: "center",
  // cellClassName: "centeredCell", // 셀 중앙 정렬 클래스
};

// 열 정의
const columns = [
  { field: "id", headerName: "모임 번호", width: 100, ...commonColumnProps },
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
    cellClassName: "bold-cell", // 볼드체 클래스를 적용
    ...commonColumnProps,
  },
  {
    field: "activity_scope",
    headerName: "활동범위",
    width: 100,
    ...commonColumnProps,
  },
  {
    field: "likes",
    headerName: "좋아요",
    type: "number",
    width: 100,
    ...commonColumnProps,
  },
  {
    field: "status",
    headerName: "현황",
    width: 100,
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
