// src/PostDetail.js
import React, { useState } from "react";
import styled from "styled-components";

// 전체 포스트 디테일 컨테이너 스타일을 정의합니다.
const PostDetailContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  max-width: 1024px;
  margin: 80px auto;
  font-family: Arial, sans-serif;
`;

// 포스트 헤더 섹션 스타일을 정의합니다.
const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
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
  margin-bottom: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

// 모임 링크 섹션 스타일을 정의합니다.
const PostLink = styled.div`
  margin-bottom: 20px;
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
  margin-bottom: 40px;

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
  margin-bottom: 32px;
`;

// 댓글 리스트 스타일을 정의합니다.
const CommentsList = styled.div`
  margin-bottom: 32px;
`;

// 개별 댓글 스타일을 정의합니다.
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
`;

// 댓글 닉네임 스타일을 정의합니다.
const CommentNickname = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
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
  margin-bottom: 8px;
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
  // 전체 댓글 상태
  const [comments, setComments] = useState([
    { nickname: "닉네임1", text: "댓글 내용입니다." },
    { nickname: "닉네임2", text: "다른 댓글 내용입니다." },
  ]);

  // 새로운 댓글 내용 상태
  const [newComment, setNewComment] = useState("");

  // 댓글 내용 입력 변화 핸들러
  const handleCommentChange = (e) => setNewComment(e.target.value);

  // 댓글 제출 핸들러
  const handleCommentSubmit = () => {
    if (newComment) {
      // 새로운 댓글을 추가하여 상태를 업데이트합니다.
      setComments([...comments, { nickname: "내 닉네임", text: newComment }]);
      // 입력 필드 초기화
      setNewComment("");
    }
  };

  return (
    <PostDetailContainer>
      {/* 게시글 제목, 주제, 범위, 지역 정보 필드 */}
      <PostHeader>
        <PostInfo>모임명: 예제 모임</PostInfo>
        <PostInfo>모임 주제: 예제 주제</PostInfo>
        <PostInfo>활동 범위: 예제 범위</PostInfo>
        <PostInfo>활동 지역: 예제 지역</PostInfo>
      </PostHeader>
      {/* 게시글 설명 */}
      <PostDescription>
        모임 설명: 이곳에 모임 설명이 들어갑니다.
      </PostDescription>
      {/* 단톡방 링크 */}
      <PostLink>
        <a href="#">모임 단톡방 링크</a>
      </PostLink>
      {/* 수정, 삭제 버튼 */}
      <PostActions>
        <button>수정하기</button>
        <button>삭제하기</button>
      </PostActions>
      {/* 댓글 섹션 */}
      <PostComments>
        <CommentsHeader>댓글 {comments.length}</CommentsHeader>
        <CommentsList>
          {comments.map((comment, index) => (
            <Comment key={index}>
              <CommentNickname>{comment.nickname}</CommentNickname>
              <CommentText>{comment.text}</CommentText>
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
