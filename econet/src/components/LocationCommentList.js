import styled from "styled-components";

const PostComments = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;

const CommentsHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const CommentsList = styled.div`
  margin-bottom: 10px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isUserComment && props.isLoggedIn ? "#f7f6f9" : "#f9f9f9"};
  color: ${(props) =>
    props.isUserComment && props.isLoggedIn ? "#3486f3" : "black"};
`;

const CommentNickname = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentText = styled.div`
  padding: 10px;
  background-color: transparent;
  border-radius: 4px;
`;

function LocationCommentList({ comments, isLoggedIn, userId }) {
  return (
    <PostComments>
      <CommentsList>
        {comments.map((item) => (
          <Comment
            key={item.id}
            isUserComment={item.userId === userId}
            isLoggedIn={isLoggedIn}
          >
            <CommentNickname>{item.nickname}</CommentNickname>
            <CommentText>{item.content}</CommentText>
          </Comment>
        ))}
      </CommentsList>
    </PostComments>
  );
}

export default LocationCommentList;
