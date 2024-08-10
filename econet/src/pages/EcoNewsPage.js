import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import EcoNewsList from "../components/EcoNewsList";
import EcoPartyList from "../components/EcoPartyList";
import LoadingSpinner from "../components/LoadingSpinner";
import { api } from "../api";

const EcoNewsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EcoNewsListContainer = styled.div`
  display: flex;
  margin: 0 0 16px 0;
  gap: 32px;
  justify-content: space-around;
`;

const Header = styled.h1`
  font-size: 32px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function EcoNewsPage() {
  const [searchText, setSearchText] = useState("");
  const [domesticNews, setDomesticNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domesticPage, setDomesticPage] = useState(1);
  const [worldPage, setWorldPage] = useState(1);

  const handleSearch = (inputText) => {
    setSearchText(inputText);
  };

  const fetchDomesticNews = async () => {
    try {
      const response = await api.get("/articles", {
        params: {
          page: domesticPage,
          limit: 10,
        },
      });
      const { hkbs_articles } = response.data;
      setDomesticNews((prevNews) => [...prevNews, ...hkbs_articles.data]);
      setDomesticPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch domestic news.", error);
    }
  };

  const fetchWorldNews = async () => {
    try {
      const response = await api.get("/articles", {
        params: {
          page: worldPage,
          limit: 10,
        },
      });
      const { bbc_articles } = response.data;
      setWorldNews((prevNews) => [...prevNews, ...bbc_articles.data]);
      setWorldPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch world news.", error);
    }
  };

  useEffect(() => {
    const fetchInitialNews = async () => {
      setLoading(true);
      await Promise.all([fetchDomesticNews(), fetchWorldNews()]);
      setLoading(false);
    };
    fetchInitialNews();
  }, []);

  useEffect(() => {
    if (searchText === "") return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await api.get("/articles/search", {
          params: {
            query: searchText,
          },
        });
        const { bbc_articles, hkbs_articles } = response.data;

        setDomesticNews(hkbs_articles.data);
        setWorldNews(bbc_articles.data);
      } catch (error) {
        console.error("Failed to fetch search results.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchText]);

  return (
    <EcoNewsPageContainer>
      <SearchBar onSearch={handleSearch}></SearchBar>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <EcoNewsListContainer>
          <Container>
            <Header>국내 뉴스</Header>
            <EcoNewsList news={domesticNews} />
          </Container>
          <Container>
            <Header>국제 뉴스</Header>
            <EcoNewsList news={worldNews} />
          </Container>
        </EcoNewsListContainer>
      )}
      <EcoPartyList />
    </EcoNewsPageContainer>
  );
}
