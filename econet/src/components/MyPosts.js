// README: 나의 게시글제목 나열할 컴포넌트

import styled from "styled-components";

// 게시글 담을 테두리 상자
const PostBox = styled.div`
  width: 640px;
  height: 80px;
  border-radius: 16px;
  border: 1px solid #6bddc4;
`;

// 내가 쓴 게시글제목 하나
function MyPost({ item }) {
  return (
    <PostBox>{`게시글제목임게시글제목임게시글제목임게시글제목임`}</PostBox>
  );
}

// 내가 쓴 게시글제목들
// items 자리에 해당 유저의 댓글 prop 전달
export default function MyPosts({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li>
            <MyPost item={item} />
          </li>
        );
      })}
    </ul>
  );
}
