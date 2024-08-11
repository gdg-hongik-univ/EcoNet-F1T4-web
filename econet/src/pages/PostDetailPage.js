// src/PostDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import { api } from "../api/index.js";
import { getIdDetail } from "../api/getboarddetail";
import { createComment } from "../api/comment";
import { isLoggedInState } from "../atom/atoms.js";
import { postBoardLike } from "../api/postlike.js";
import styled, { keyframes } from "styled-components";

// 스타일 정의
const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const PostDetailContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* 필요에 따라 줄바꿈을 허용 */
  margin-bottom: 10px;
`;

const PostInfo = styled.div`
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const PostDescription = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const PostLink = styled.div`
  margin-bottom: 10px;
  a {
    color: #56d8bc;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
`;

// 버튼과 에러 메시지 컨테이너 스타일
const PostActions = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  align-items: flex-end; /* 오른쪽으로 정렬 */
  margin-bottom: 20px;

  /* 버튼 컨테이너 추가 */
  .button-container {
    display: flex;
    gap: 10px; /* 버튼 사이의 간격 */
  }
`;

// 버튼 스타일
const PostButton = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: #56d8bc;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45c4a0;
  }
`;

const LikeButton = styled.button`
  background-color: transparent; /* 버튼 배경을 투명하게 설정 */
  color: ${(props) =>
    props.disabled
      ? "#ff69b4"
      : "#56d8bc"}; /* 좋아요 상태일 때 텍스트 색상 고정 */
  padding: 8px 16px;
  border: 1px solid ${(props) => (props.disabled ? "#ff69b4" : "#56d8bc")}; /* 좋아요 상태일 때 고정된 외곽선 색상 */
  border-radius: 4px;
  cursor: pointer;
  position: relative; /* pseudo-element를 사용할 때 필요 */
  overflow: hidden; /* pseudo-element가 버튼을 넘지 않도록 설정 */
  transition: color 0.3s, border-color 0.3s; /* 텍스트 색상과 외곽선 색상 변화에 대한 트랜지션 설정 */

  /* 버튼에 hover 효과 추가 */
  &:hover {
    color: #ff69b4; /* hover 시 텍스트 색상 변경 */
    border-color: #ff69b4; /* hover 시 외곽선 색상 변경 */
  }

  /* 클릭 시 효과를 추가하기 위해 ::after pseudo-element 사용 */
  &:active::after {
    content: ""; /* 내용 없음 */
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%; /* 오버레이의 크기를 설정 */
    height: 300%;
    background-color: rgba(255, 105, 180, 0.5); /* 부드러운 핑크색 오버레이 */
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
    color: #ff007f; /* 클릭 시 텍스트 색상 변경 */
    border-color: #ff007f; /* 클릭 시 외곽선 색상 변경 */
  }

  &:active::after {
    opacity: 1; /* 클릭 시 오버레이 보이도록 설정 */
  }

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  animation: ${fadeInOut} 3s ease-in-out;
`;

const PostComments = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 10px;
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

const CommentInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  align-self: flex-end;
  padding: 8px 12px;
  border: none;
  background-color: ${(props) =>
    props.disabled ? "#d9d9d9" : "#56d8bc"}; /* 비활성화 상태 배경 색상 */
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* 배경 색상과 텍스트 색상 변화에 대한 트랜지션 설정 */
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const PostDetailPage = () => {
  const { id: gatheringpost_id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState); // 상태 업데이트 함수 사용
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState); // 상태 업데이트 함수 사용
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(0); // 좋아요 수 상태 추가
  const [hasLiked, setHasLiked] = useState(false); // 현재 사용자가 좋아요를 눌렀는지 여부
  const [showError, setShowError] = useState(false); // 로그인 상태 메시지 표시 여부

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await getIdDetail(gatheringpost_id);
        setPost(data);

        // 서버로부터 받은 댓글 데이터를 가공하여 user_id와 isUserComment 상태 유지
        const updatedComments = (data.comments || []).map((comment) => ({
          ...comment,
          isUserComment: comment.user_id === user.id, // 작성자와 로그인된 사용자가 동일한지 여부 판단
        }));

        setComments(updatedComments);
        setLikes(data.likes); // 좋아요 수 초기화
        setHasLiked(data.user_has_liked); // 현재 사용자의 좋아요 여부 초기화
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostData();
  }, [gatheringpost_id, user.id]); // user.id도 의존성 배열에 포함하여 로그인된 사용자 정보가 변경될 때도 데이터를 다시 가져오도록 설정

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      if (!user.id) {
        setError("로그인 상태가 아닙니다. 로그인 후 다시 시도해 주세요.");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000); // 3초 후 메시지 숨기기
        return;
      }

      try {
        const response = await createComment(gatheringpost_id, {
          content: newComment.trim(),
          user_id: user.id,
        });

        setComments([
          ...comments,
          {
            ...response,
            author: response.user_id,
            isUserComment: user.id === response.user_id,
          },
        ]);
        setNewComment("");
        setError("");
      } catch (error) {
        setError(error.message || "댓글 작성에 실패했습니다.");
        console.error(error);
      }
    } else {
      setError("댓글 내용을 입력해주세요.");
    }
  };

  const handleEdit = () => {
    navigate(`/board/postmake?mode=edit&id=${gatheringpost_id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/boards/${gatheringpost_id}/`);
      alert(response.data.message);
      navigate("/board"); // 삭제 후 게시판 목록 페이지로 리디렉션
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    if (!isLoggedIn) {
      setError("로그인 후 좋아요를 눌러주세요.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000); // 3초 후 메시지 숨기기
      return;
    }

    if (hasLiked) return; // 이미 좋아요를 누른 경우 아무 작업도 하지 않음

    try {
      const response = await postBoardLike(gatheringpost_id);
      setLikes(response.likes);
      setHasLiked(true);
    } catch (error) {
      setError(error.message || "좋아요 등록에 실패했습니다.");
      console.error(error);
    }
  };

  // 로그인한 사용자와 게시글 작성자 일치 여부
  const showEditDeleteButtons = isLoggedIn && post.user_id === user.id;

  return (
    <PostDetailContainer>
      <PostHeader>
        <PostInfo>
          <BoldText>모임명</BoldText> {post.name}
        </PostInfo>
        <PostInfo>
          <BoldText>모임 주제</BoldText> {post.subject}
        </PostInfo>
        <PostInfo>
          <BoldText>활동 범위</BoldText> {post.activity_scope}
        </PostInfo>
        <PostInfo>
          <BoldText>활동 지역</BoldText> {post.location}
        </PostInfo>
      </PostHeader>
      <PostDescription>
        <BoldText>
          모임 설명
          <br />
        </BoldText>{" "}
        {post.description}
      </PostDescription>
      <PostLink>
        <a href={post.chat_link} target="_blank" rel="noopener noreferrer">
          모임 참가하기
        </a>
      </PostLink>

      <PostActions>
        <div className="button-container">
          <LikeButton onClick={handleLike} disabled={hasLiked}>
            {hasLiked ? "좋아요" : "좋아요"} {likes}
          </LikeButton>
          {showEditDeleteButtons && (
            <div className="button-container">
              <PostButton onClick={handleEdit}>수정하기</PostButton>
              <PostButton onClick={handleDelete}>삭제하기</PostButton>
            </div>
          )}
        </div>
        {showError && <ErrorMessage>{error}</ErrorMessage>}
      </PostActions>

      <PostComments>
        <CommentsHeader>댓글 {comments.length}</CommentsHeader>
        <CommentsList>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              isUserComment={comment.isUserComment}
              isLoggedIn={isLoggedIn}
            >
              <CommentNickname>
                {"user_"}
                {comment.user_id}
              </CommentNickname>{" "}
              <CommentText>{comment.content}</CommentText>
            </Comment>
          ))}
        </CommentsList>
        <CommentInput>
          <Input
            type="text"
            placeholder="댓글 내용을 입력해주세요."
            value={newComment}
            onChange={handleCommentChange}
            disabled={!isLoggedIn} // 로그인 상태에 따라 댓글 입력 필드 비활성화
          />
          <Button
            onClick={handleCommentSubmit}
            disabled={!isLoggedIn} // 로그인 상태에 따라 댓글 등록 버튼 비활성화
          >
            댓글 등록
          </Button>
        </CommentInput>
      </PostComments>
    </PostDetailContainer>
  );
};

export default PostDetailPage;
