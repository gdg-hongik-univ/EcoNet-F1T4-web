// src/PostDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atom/userAtom";
import { api } from "../api/index.js";
import { getIdDetail } from "../api/getboarddetail";
import { createComment } from "../api/comment";
import styled from "styled-components";

// 스타일 정의
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

const PostActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  & > button {
    margin-left: 10px;
    padding: 8px 12px;
    border: none;
    background-color: #56d8bc;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
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
  color: ${(props) => (props.isUserComment ? "#00796b" : "#000")};
`;

const CommentNickname = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentText = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
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
  background-color: #56d8bc;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const LikeButton = styled.button`
  background-color: transparent; /* 버튼 배경을 투명하게 설정 */
  color: #56d8bc; /* 텍스트 색상을 외곽선 색상으로 설정 */
  padding: 8px 16px;
  border: 1px solid #56d8bc; /* 외곽선 색상 설정 */
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

const BoldText = styled.span`
  font-weight: 700;
`;

const PostDetailPage = () => {
  const { id: gatheringpost_id } = useParams();
  const navigate = useNavigate();
  const user = useRecoilValue(userState); // Recoil 상태에서 사용자 정보 가져오기

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await getIdDetail(gatheringpost_id);
        setPost(data);
        setComments(data.comments || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostData();
  }, [gatheringpost_id]);

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      if (!user.id) {
        setError("로그인 상태가 아닙니다. 로그인 후 다시 시도해 주세요.");
        return;
      }

      try {
        const response = await createComment(gatheringpost_id, {
          content: newComment.trim(),
          user_id: user.id, // 사용자 ID를 포함
        });

        setComments([
          ...comments,
          {
            ...response,
            author: user.id, // 작성자의 ID를 직접 사용
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

  const handleEdit = async () => {
    const updatedPost = {
      name: post.name,
      subject: post.subject,
      activity_scope: post.activity_scope,
      status: post.status,
      chat_link: post.chat_link,
      description: post.description,
      location: post.location,
    };

    try {
      const response = await api.patch(
        `/boards/${gatheringpost_id}/`,
        updatedPost
      );
      setPost(response.data);
      alert("모임 정보가 수정되었습니다.");
    } catch (error) {
      console.error(error);
    }
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
        <button onClick={handleEdit}>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
      </PostActions>

      <PostComments>
        <CommentsHeader>댓글 {comments.length}</CommentsHeader>
        <CommentsList>
          {comments.map((comment, index) => (
            <Comment key={index} isUserComment={comment.isUserComment}>
              <CommentNickname>{comment.author}</CommentNickname>{" "}
              {/* 작성자의 ID 표시 */}
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
          />
          <Button onClick={handleCommentSubmit}>댓글 등록</Button>
        </CommentInput>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </PostComments>
      <LikeButton>좋아요</LikeButton>
    </PostDetailContainer>
  );
};

export default PostDetailPage;
