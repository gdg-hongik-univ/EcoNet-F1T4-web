import React from "react";
import styled from "styled-components";

// 댓글 박스 스타일 정의
const CommentBox = styled.div`
  width: 320px;
  height: 80px;
  border-radius: 16px;
  border: 1px solid #6bddc4;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// MyComment 컴포넌트 정의 (댓글 하나를 나타냄)
function MyComment({ item }) {
  return <CommentBox>{item}</CommentBox>;
}

// MyComments 컴포넌트 정의 (댓글 리스트를 나타냄)
export default function MyComments({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <MyComment key={index} item={item} />
      ))}
    </div>
  );
}
