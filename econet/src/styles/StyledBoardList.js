import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

// 스타일 정의
const StyledBoardList = styled(DataGrid)`
  width: 600px;

  /* 셀 포커스 스타일 제거 */
  .MuiDataGrid-cell:focus {
    outline: none; /* 포커스 상태에서 테두리 제거 */
    box-shadow: none; /* 포커스 상태에서 그림자 제거 */
  }

  .MuiDataGrid-columnHeader:focus {
    outline: none; /* 포커스 상태에서 테두리 제거 */
    box-shadow: none; /* 포커스 상태에서 그림자 제거 */
  }

  .MuiDataGrid-columnSeparator {
    display: none; /* 열 크기 조정 핸들 숨기기 */
  }

  .MuiDataGrid-cell {
    overflow: hidden; /* 셀 내용이 넘치지 않도록 */
    cursor: default; /* 기본 커서로 설정 */
  }

  .MuiDataGrid-cell.clickable {
    cursor: pointer; /* 클릭 가능한 셀에 대해 포인터 커서 설정 */
  }

  .MuiDataGrid-columnHeader {
    user-select: none; /* 열 제목의 텍스트 선택 방지 */
    text-align: center; /* 열 제목 중앙 정렬 */
  }

  .centeredCell {
    display: flex;
    align-items: center;
    justify-content: center; /* 셀 내용을 중앙 정렬 */
  }

  .MuiDataGrid-footer {
    display: flex;
    justify-content: center; /* 페이지 네비게이션 버튼을 가운데로 정렬 */
    align-items: center;
  }

  .MuiDataGrid-footerContainer {
    display: flex;
    justify-content: center; /* 페이지 네비게이션 버튼을 가운데로 정렬 */
    align-items: center;
    padding: 0; /* 페이지 네비게이션 버튼의 여백 제거 */
  }

  .MuiDataGrid-selectedRowCount {
    display: none; /* 선택된 행 수 메시지 숨기기 */
  }

  .MuiDataGrid-pagination {
    margin: 0; /* 페이지 네비게이션 버튼의 여백 조정 */
  }

  /* 호버 및 클릭 시 색깔 변화 없게 하기 */
  .MuiDataGrid-cell:hover {
    background-color: transparent !important; /* 호버 시 배경색 없애기 */
  }

  .MuiDataGrid-row:hover {
    background-color: transparent !important; /* 호버 시 행 배경색 없애기 */
  }

  .MuiDataGrid-row.Mui-selected {
    background-color: transparent !important; /* 선택된 행 배경색 없애기 */
  }

  .MuiDataGrid-cell.Mui-selected {
    background-color: transparent !important; /* 선택된 셀 배경색 없애기 */
  }

  /* 클릭할 수 없는 셀 배경색도 투명하게 */
  .MuiDataGrid-cell:not(.clickable) {
    cursor: default; /* 클릭할 수 없는 셀 커서 설정 */
  }

  /* 테이블 외곽선 제거 */
  &:focus {
    outline: none;
  }
  .MuiDataGrid-root {
    outline: none;
  }
  .MuiDataGrid-cell:focus {
    outline: none;
  }
  .MuiDataGrid-columnHeader:focus {
    outline: none;
  }
`;

export default StyledBoardList;
