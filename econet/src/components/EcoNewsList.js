import { useRef, useCallback, useState } from "react";
import EcoNews from "./EcoNews";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const EcoNewsContainer = styled.div`
  display: flex;
  gap: 8px;
  height: 340px;
  flex-direction: column;
  align-items: center;
  border: 2px solid #000000;
  overflow-y: scroll;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function EcoNewsList({ news, fetchMoreNews, hasMore }) {
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastNewsElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoading(true);
          fetchMoreNews().finally(() => setLoading(false));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, fetchMoreNews, hasMore]
  );

  return (
    <EcoNewsContainer>
      {news.map((article, index) => (
        <div
          key={article.id}
          ref={news.length === index + 1 ? lastNewsElementRef : null}
        >
          <EcoNews
            imgUrl={article.image_url || ""}
            newsTitle={article.title}
            date={article.date}
            url={article.url}
          />
        </div>
      ))}
      {loading && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )}{" "}
      {/* 로딩 중일 때 로딩 스피너 표시 */}
    </EcoNewsContainer>
  );
}
