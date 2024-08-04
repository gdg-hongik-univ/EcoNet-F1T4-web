import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  margin: 0;
`;

const StyledInput = styled.input`
  padding: 0;
  margin-top: 25px;
  height: auto;
  border: 0;
  background-color: #f5f5f5;
  color: #8a8a8a;

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
  position: absolute;
  right: 45px;
  top: 94px;
  height: 23px;
  padding: 0 8px;
  background-color: #ffffff;
  border: 0;
  border-radius: 2px;
  box-shadow: 1px 1px 2.5px 1px rgba(0, 0, 0, 0.2);
`;

function ImageUpload() {
  const [image, setImage] = useState();
  const [isSelecting, setIsSelecting] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const imgUrl = URL.createObjectURL(image);
    console.log(imgUrl);
    //서버로 전송
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setIsSelecting(false);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput type="file" accept="image/*" onChange={handleChange} />
      <StyledButton type="submit" disabled={isSelecting}>
        업로드
      </StyledButton>
    </StyledForm>
  );
}

export default ImageUpload;
