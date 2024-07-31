// README: 내가 쓴 댓글들 나열할 컴포넌트

import styled from "styled-components";

// 댓글 담을 테두리 상자
const CommentBox = styled.div`
  width: 640px;
  height: 80px;
  border-radius: 16px;
  border: 1px solid #6bddc4;
`;

// 내가 쓴 댓글 하나
function MyComment({ item }) {
  return (
    <CommentBox>{`댓글임댓글임댓글임댓글임댓글임댓글임댓글임댓글임`}</CommentBox>
  );
}

// 내가 쓴 댓글 들
// items 자리에 해당 유저의 댓글 prop 전달
export default function MyComments({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li>
            <MyComment item={item} />
          </li>
        );
      })}
    </ul>
  );
}
