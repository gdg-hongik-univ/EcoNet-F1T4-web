import React from "react";
import styled from "styled-components";

// 댓글 리스트 컨테이너 스타일 정의
const CommentsContainer = styled.div`
  width: 480px; // 고정된 너비
  height: 480px; // 고정된 높이
  border-radius: 16px;
  border: 1px solid #6bddc4;
  overflow-y: scroll; // 내용이 넘칠 경우 스크롤
  padding: 10px;
  box-sizing: border-box; // 패딩 포함 크기 계산
`;

const Header = styled.h2`
  font-size: 32px;
  font-weight: 600;
`;

// 댓글 박스 스타일 정의
const CommentBox = styled.div`
  width: 100%;
  min-height: 80px;
  border-radius: 16px;
  border: 1px solid #6bddc4;
  margin: 10px 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  box-sizing: border-box; // 패딩 포함 크기 계산
`;

// MyComment 컴포넌트 정의 (댓글 하나를 나타냄)
function MyComment({ item }) {
  return <CommentBox>{item.content}</CommentBox>; // content 속성 출력
}

// MyComments 컴포넌트 정의 (댓글 리스트를 나타냄)
export default function MyComments({ items }) {
  return (
    <CommentsContainer>
      <Header>나의 댓글</Header>
      {items.map((item) => (
        <MyComment key={item.id} item={item} />
      ))}
    </CommentsContainer>
  );
}
