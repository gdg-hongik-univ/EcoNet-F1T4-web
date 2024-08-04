import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  margin-top: 30px;
  margin-bottom: 100px;
`;

const StyledInput = styled.input`
  border: 0;
  border-radius: 5px;
  box-shadow: 1px 1px 2.5px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  float: right;
  margin-top: 5px;
  background-color: #6bddc4;
  color: #ffffff;
  border: 0;
  border-radius: 5px;
  padding: 5px 16px;

  &:disabled {
    background-color: #d5d5d5;
  }
`;

function LocationCommentInput() {
  const [comments, setComments] = useState({
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    //서버로 전송
  };

  const handleChange = (name, value) => {
    setComments((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
    if (comments.content.length < 2) {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        name="content"
        value={comments.content}
        onChange={handleInputChange}
        placeholder="위치를 설명해주세요.."
      />
      <StyledButton type="submit" disabled={isSubmitting}>
        등록
      </StyledButton>
    </StyledForm>
  );
}

export default LocationCommentInput;
