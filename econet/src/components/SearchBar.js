import { useState } from "react";
import styled from "styled-components";
import Icon from "../assets/icons/314807_search_icon.png";

const SearchContainer = styled.div`
  display: flex;
  margin-top: 40px;
`;

const SearchIcon = styled.img`
  width: 48px;
  height: 48px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Input = styled.input`
  width: 360px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid #000000;
  background-color: ${(props) => (props.disabled ? "#e0e0e0" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
`;

export default function SearchBar({ onSearch, disabled }) {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSearch = () => {
    if (!disabled) {
      onSearch(inputText);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !disabled) {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <Input
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요"
        disabled={disabled}
      />
      <SearchIcon src={Icon} onClick={handleSearch} disabled={disabled} />
    </SearchContainer>
  );
}
