import { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atom/atoms.js";
import { postBinComment } from "../api/postbincomment"; // postBinComment 함수 임포트

const CommentInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 100px;
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

  &:disabled {
    background-color: #d5d5d5;
    cursor: not-allowed;
  }
`;

function LocationCommentInput({ binId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [isLoggedIn] = useRecoilState(isLoggedInState); // 상태 업데이트 함수 사용

  const isSubmitting = content.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postBinComment(binId, content);
      setContent(""); // 댓글 전송 후 입력 필드 초기화
      if (onCommentAdded) {
        onCommentAdded(); // 댓글 추가 후 콜백 호출 (옵션)
      }
    } catch (err) {
      console.error("Failed to post comment:", err.message);
      // 에러 처리 로직 추가 가능
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <CommentInput>
      <Input
        name="content"
        value={content}
        onChange={handleChange}
        placeholder="위치를 설명해주세요.."
        disabled={!isLoggedIn} // 로그인 상태에 따라 댓글 등록 버튼 비활성화
      />
      <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
        등록하기
      </Button>
    </CommentInput>
  );
}

export default LocationCommentInput;
