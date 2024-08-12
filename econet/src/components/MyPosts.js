import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 게시글 리스트 컨테이너 스타일 정의
const PostsContainer = styled.div`
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

// 게시글 박스 스타일 정의
const PostBox = styled.div`
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
  &:hover {
    color: #58d7bc;
  }
`;

// MyPost 컴포넌트 정의 (게시글 하나를 나타냄)
function MyPost({ item }) {
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/board/detail/${item.id}`);
  };

  return <PostBox onClick={handlePostClick}>{item.name}</PostBox>; // 게시글name 출력
}

// MyPosts 컴포넌트 정의 (게시글 리스트를 나타냄)
export default function MyPosts({ items }) {
  return (
    <PostsContainer>
      <Header>나의 게시글</Header>
      {items.map((item) => (
        <MyPost key={item.id} item={item} />
      ))}
    </PostsContainer>
  );
}
