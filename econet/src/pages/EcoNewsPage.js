import { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import EcoNewsList from "../components/EcoNewsList";
import EcoPartyList from "../components/EcoPartyList";

// CSS
import "../styles/econewspage/econewspage-styles.css";

export default function EcoNewsPage() {
  const [searchText, setSearchText] = useState(""); // searchText = 검색창에 입력한 검색키워드

  const handleSearch = (inputText) => {
    setSearchText(inputText);
  };
  return (
    <div>
      <div className="search-bar-flex">
        <SearchBar onSearch={handleSearch}></SearchBar>
        <button>즐겨찾기 한 기사들</button>
      </div>
      <div className="econews-list-box">
        <EcoNewsList></EcoNewsList>
        <EcoNewsList></EcoNewsList>
      </div>
      <EcoPartyList></EcoPartyList>
    </div>
  );
}
