import { useState } from "react";
import styled from "styled-components";
import { api } from "../api/index.js";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column; /* Flexbox를 사용하여 자식 요소를 세로로 정렬 */
  align-items: center; /* 자식 요소를 수평 중앙 정렬 */
  margin: 0;
`;

const StyledInput = styled.input`
  padding: 0;
  margin-top: 25px;
  height: auto;
  border: 0;
  background-color: #f5f5f5;
  color: #8a8a8a;
  display: block; /* block으로 설정하여 전체 너비를 사용 */

  &::file-selector-button {
    background-color: #6bddc4;
    color: #ffffff;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    padding: 8px 16px;
    margin-right: 20px;
  }
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) =>
    props.disabled ? "#d5d5d5" : "#6bddc4"}; /* 비활성화 시 색상 변경 */
  color: #ffffff;
  border: 0;
  border-radius: 5px;
  box-shadow: 1px 1px 2.5px 1px rgba(0, 0, 0, 0.2);
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) =>
    props.disabled ? "0.6" : "1"}; /* 비활성화 시 투명도 조절 */
`;

function ImageUpload({ binId, onUploadSuccess }) {
  const [image, setImage] = useState(null);
  const [isSelecting, setIsSelecting] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", image);

    try {
      const response = await api.post(`/maps/${binId}/pic_upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // 액세스 토큰 포함
        },
      });

      console.log("업로드 성공:", response.data);

      if (onUploadSuccess) {
        // 서버 응답으로 받은 데이터로 상태 업데이트
        onUploadSuccess(response.data);
      }
    } catch (error) {
      console.error("업로드 실패:", error);
      // 추가적인 로그를 통해 문제를 파악할 수 있습니다.
      console.log("에러 응답:", error.response);
      console.log("에러 메시지:", error.message);
    }
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setIsSelecting(false); // 파일이 선택되면 isSelecting을 false로 설정
    } else {
      setImage(null);
      setIsSelecting(true); // 파일이 선택되지 않으면 isSelecting을 true로 설정
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput type="file" accept="image/*" onChange={handleChange} />
      <StyledButton
        type="submit"
        disabled={isSelecting} // isSelecting 상태에 따라 버튼 비활성화
      >
        업로드
      </StyledButton>
    </StyledForm>
  );
}

export default ImageUpload;
