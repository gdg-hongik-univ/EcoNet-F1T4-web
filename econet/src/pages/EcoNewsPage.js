import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import EcoNewsList from "../components/EcoNewsList";
import EcoPartyList from "../components/EcoPartyList";

const EcoNewsListContainer = styled.div`
  display: flex;
  margin: 16px 0 16px 0;
  padding: 8px;
  justify-content: space-around;
`;

export default function EcoNewsPage() {
  const [searchText, setSearchText] = useState(""); // searchText = 검색창에 입력한 검색키워드

  const handleSearch = (inputText) => {
    setSearchText(inputText);
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch}></SearchBar>

      <EcoNewsListContainer>
        <EcoNewsList></EcoNewsList>
        <EcoNewsList></EcoNewsList>
      </EcoNewsListContainer>
      <EcoPartyList></EcoPartyList>
    </div>
  );
}
