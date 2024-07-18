import { useState } from "react";

import searchIcon from "../assets/icons/314807_search_icon.png";

// CSS

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
    <div>
      <img src={searchIcon} onClick={handleSearch}></img>
      <input
        value={inputText}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
      ></input>
    </div>
  );
}
