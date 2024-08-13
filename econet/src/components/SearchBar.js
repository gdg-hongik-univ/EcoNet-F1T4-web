import { useState } from "react";
import styled from "styled-components";

import Icon from "../assets/icons/314807_search_icon.png";

const SearchContainer = styled.div`
  display: flex;
  margin-top: 16px;
`;
const SearchIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const Input = styled.input`
  width: 360px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid #000000;
`;
// 검색창 컴포넌트
export default function SearchBar({ onSearch }) {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSearch = () => {
    alert("버튼누름");
    onSearch(inputText);
  };
  return (
    <SearchContainer>
      <Input
        value={inputText}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
      ></Input>
      <SearchIcon src={Icon} onClick={handleSearch} />
    </SearchContainer>
  );
}
