import React from "react";
import styled from "styled-components";

// 게시글 박스 스타일 정의
const PostBox = styled.div`
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

// MyPost 컴포넌트 정의 (게시글 하나를 나타냄)
function MyPost({ item }) {
  return <PostBox>{item}</PostBox>;
}

// MyPosts 컴포넌트 정의 (게시글 리스트를 나타냄)
export default function MyPosts({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <MyPost key={index} item={item} />
      ))}
    </div>
  );
}
