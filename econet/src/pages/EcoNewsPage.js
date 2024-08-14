import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import EcoNewsList from "../components/EcoNewsList";
import EcoPartyList from "../components/EcoPartyList";
import LoadingSpinner from "../components/LoadingSpinner";
import NewsModal from "../components/NewsModal";
import { api } from "../api";

// 스타일링된 컴포넌트 정의
const EcoNewsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EcoNewsListContainer = styled.div`
  display: flex;
  position: relative;
  bottom: 40px;
  gap: 64px;
  justify-content: space-around;
`;

const Header = styled.h1`
  font-size: 28px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  width: 720px;
  height: 800px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #000000;
`;

// EcoNewsPage 컴포넌트 정의
export default function EcoNewsPage() {
  // 상태 선언
  const [searchText, setSearchText] = useState(""); // 검색어를 저장
  const [domesticNews, setDomesticNews] = useState([]); // 국내 뉴스 데이터
  const [worldNews, setWorldNews] = useState([]); // 국제 뉴스 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [domesticPage, setDomesticPage] = useState(1); // 국내 뉴스 페이지 번호
  const [worldPage, setWorldPage] = useState(1); // 국제 뉴스 페이지 번호
  const [hasMoreDomestic, setHasMoreDomestic] = useState(true); // 더 불러올 국내 뉴스가 있는지 여부
  const [hasMoreWorld, setHasMoreWorld] = useState(true); // 더 불러올 국제 뉴스가 있는지 여부
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 열림/닫힘 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 데이터

  // 뉴스 데이터를 서버에서 가져오는 함수
  const fetchNews = async (type) => {
    try {
      // 서버에서 뉴스 데이터를 가져옴
      const response = await api.get("/articles", {
        params: {
          page: type === "domestic" ? domesticPage : worldPage, // 요청할 페이지 번호 설정
          limit: 5, // 한 번에 가져올 뉴스 기사 수
        },
      });

      const articles =
        type === "domestic"
          ? response.data.hkbs_articles // 국내 뉴스 데이터
          : response.data.bbc_articles; // 국제 뉴스 데이터

      if (type === "domestic") {
        // 국내 뉴스일 경우
        setDomesticNews((prevNews) => [...prevNews, ...articles.data]); // 기존 뉴스에 추가

        setDomesticPage((prevPage) => prevPage + 1); // 페이지 번호 증가
        if (articles.data.length < 5) {
          setHasMoreDomestic(false); // 더 이상 가져올 뉴스가 없으면 상태를 false로 설정
        }
      } else {
        // 국제 뉴스일 경우
        setWorldNews((prevNews) => [...prevNews, ...articles.data]); // 기존 뉴스에 추가
        setWorldPage((prevPage) => prevPage + 1); // 페이지 번호 증가
        if (articles.data.length < 5) {
          setHasMoreWorld(false); // 더 이상 가져올 뉴스가 없으면 상태를 false로 설정
        }
      }
    } catch (error) {
      console.error(`Failed to fetch ${type} news.`, error); // 에러 발생 시 로그 출력
    }
  };

  // 컴포넌트가 처음 마운트될 때 초기 뉴스 데이터를 가져옴
  useEffect(() => {
    const fetchInitialNews = async () => {
      setLoading(true); // 로딩 상태 설정
      await Promise.all([fetchNews("domestic"), fetchNews("world")]); // 국내 및 국제 뉴스 데이터를 병렬로 가져옴
      setLoading(false); // 로딩 완료 후 상태 변경
    };
    fetchInitialNews(); // 초기 뉴스 데이터를 가져오는 함수 호출
  }, []);

  // 검색어가 변경될 때 호출되는 함수
  const handleSearch = (inputText) => {
    setSearchText(inputText); // 검색어 상태를 업데이트
  };

  // 검색어가 변경될 때 검색 결과를 가져옴
  useEffect(() => {
    if (searchText === "") return; // 검색어가 없으면 아무것도 하지 않음

    const fetchSearchResults = async () => {
      setLoading(true); // 로딩 상태 설정
      try {
        const response = await api.get("/articles/search", {
          params: {
            query: searchText, // 검색어로 서버에 요청
          },
        });
        const { bbc_articles, hkbs_articles } = response.data;

        // 기사 제목을 기준으로 중복된 기사를 필터링
        const allArticles = [...hkbs_articles.data, ...bbc_articles.data];
        const uniqueArticles = allArticles.filter(
          (article, index, self) =>
            index === self.findIndex((t) => t.title === article.title)
        );

        setSearchResults(uniqueArticles); // 검색 결과를 상태에 저장
        setIsModalOpen(true); // 검색 결과를 보여주는 모달을 열음
      } catch (error) {
        console.error("Failed to fetch search results.", error); // 에러 발생 시 로그 출력
      } finally {
        setLoading(false); // 로딩 완료 후 상태 변경
      }
    };

    fetchSearchResults(); // 검색 결과를 가져오는 함수 호출
  }, [searchText]);

  // 모달 창을 닫을 때 호출되는 함수
  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 창을 닫음
    setSearchText(""); // 검색어를 초기화
  };

  return (
    <EcoNewsPageContainer>
      <SearchBar onSearch={handleSearch} disabled={loading}></SearchBar>{" "}
      {/* 검색바 컴포넌트 */}
      <EcoNewsListContainer>
        <Container>
          <Header>국내 뉴스</Header>
          {loading ? (
            <LoadingContainer>
              <LoadingSpinner /> {/* 로딩 중일 때 로딩 스피너 표시 */}
            </LoadingContainer>
          ) : (
            <EcoNewsList
              news={domesticNews}
              fetchMoreNews={() => fetchNews("domestic")}
              hasMore={hasMoreDomestic}
            />
          )}
        </Container>
        <Container>
          <Header>국제 뉴스</Header>
          {loading ? (
            <LoadingContainer>
              <LoadingSpinner /> {/* 로딩 중일 때 로딩 스피너 표시 */}
            </LoadingContainer>
          ) : (
            <EcoNewsList
              news={worldNews}
              fetchMoreNews={() => fetchNews("world")}
              hasMore={hasMoreWorld}
            />
          )}
        </Container>
      </EcoNewsListContainer>
      <EcoPartyList /> {/* 기타 정보 표시 컴포넌트 */}
      <NewsModal isOpen={isModalOpen} onClose={handleModalClose}>
        {" "}
        {/* 뉴스 검색 결과를 표시하는 모달 */}
        {searchResults.length > 0 ? (
          <EcoNewsList news={searchResults} />
        ) : (
          <h2>검색 결과가 없습니다.</h2>
        )}
      </NewsModal>
    </EcoNewsPageContainer>
  );
}
