// src/PostDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams 훅을 가져옵니다.
import { api } from "../api/index.js"; // api 모듈을 import 합니다.
import styled from "styled-components";

// 전체 포스트 디테일 컨테이너 스타일을 정의합니다.
const PostDetailContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
`;

// 포스트 헤더 섹션 스타일을 정의합니다.
const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

// 모임명, 모임 주제, 활동 범위, 활동 지역 스타일을 정의합니다.
const PostInfo = styled.div`
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

// 모임 설명 텍스트 영역 스타일을 정의합니다.
const PostDescription = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

// 모임 링크 섹션 스타일을 정의합니다.
const PostLink = styled.div`
  margin-bottom: 10px;
  a {
    color: #56d8bc;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// 수정 및 삭제 버튼 섹션 스타일을 정의합니다.
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

// 댓글 섹션 스타일을 정의합니다.
const PostComments = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

// 댓글 헤더 스타일을 정의합니다.
const CommentsHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

// 댓글 리스트 스타일을 정의합니다.
const CommentsList = styled.div`
  margin-bottom: 10px;
`;

// 개별 댓글 스타일을 정의합니다.
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
`;

// 댓글 닉네임 스타일을 정의합니다.
const CommentNickname = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

// 댓글 텍스트 스타일을 정의합니다.
const CommentText = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

// 댓글 입력 섹션 스타일을 정의합니다.
const CommentInput = styled.div`
  display: flex;
  flex-direction: column;
`;

// 입력 필드 스타일을 정의합니다.
const Input = styled.input`
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// 일반 버튼 스타일을 정의합니다.
const Button = styled.button`
  align-self: flex-end;
  padding: 8px 12px;
  border: none;
  background-color: #56d8bc;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

// 좋아요 버튼 스타일을 정의합니다.
const LikeButton = styled.button`
  background-color: #56d8bc;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PostDetailPage = () => {
  const { id: gatheringpost_id } = useParams(); // useParams 훅을 사용하여 gatheringpost_id 가져옵니다.

  // useState 훅을 사용하여 상태를 관리합니다.
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 모임 상세 정보 조회하는 함수
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.get(`/boards/${gatheringpost_id}`);
        setPost(response.data); // 받아온 게시글 데이터
        setComments(response.data.comments); // 받아온 댓글 목록 리스트
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostData();
  }, [gatheringpost_id]);

  // 댓글 내용 입력 변화 핸들러
  const handleCommentChange = (e) => setNewComment(e.target.value);

  // 댓글 제출 핸들러
  const handleCommentSubmit = async () => {
    if (newComment) {
      try {
        const response = await api.post(
          `/boards/${gatheringpost_id}/comments`,
          {
            content: newComment,
          }
        );
        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 게시글 수정 핸들러
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

  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/boards/${gatheringpost_id}/`);
      alert(response.data.message);
      // 삭제 후 리디렉션 등의 추가 처리가 필요할 수 있습니다.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostDetailContainer>
      {/* 게시글 제목, 주제, 범위, 지역 정보 필드 */}
      <PostHeader>
        <PostInfo>모임명: {post.name}</PostInfo>
        <PostInfo>모임 주제: {post.subject}</PostInfo>
        <PostInfo>활동 범위: {post.activity_scope}</PostInfo>
        <PostInfo>활동 지역: {post.location}</PostInfo>
      </PostHeader>
      {/* 게시글 설명 */}
      <PostDescription>모임 설명: {post.description}</PostDescription>
      {/* 단톡방 링크 */}
      <PostLink>
        <a href={post.chat_link} target="_blank" rel="noopener noreferrer">
          모임 단톡방 링크
        </a>
      </PostLink>
      {/* 수정, 삭제 버튼 */}
      <PostActions>
        <button onClick={handleEdit}>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
      </PostActions>
      {/* 댓글 섹션 */}
      <PostComments>
        <CommentsHeader>댓글 {comments.length}</CommentsHeader>
        <CommentsList>
          {comments.map((comment, index) => (
            <Comment key={index}>
              <CommentNickname>{comment.user_id}</CommentNickname>
              <CommentText>{comment.content}</CommentText>
            </Comment>
          ))}
        </CommentsList>
        {/* 댓글 입력 필드와 등록 버튼 */}
        <CommentInput>
          <Input
            type="text"
            placeholder="댓글 내용을 입력해주세요."
            value={newComment}
            onChange={handleCommentChange}
          />
          <Button onClick={handleCommentSubmit}>댓글 등록</Button>
        </CommentInput>
      </PostComments>
      {/* 좋아요 버튼 */}
      <LikeButton>좋아요 34</LikeButton>
    </PostDetailContainer>
  );
};

export default PostDetailPage;
