import styled from "styled-components";
// import backgroundImg from "../assets/mainpage-background.jpg"; // 배경 이미지 추가
import news from "../assets/cld-cloud-wifi-svgrepo-com.svg"; // 이미지 경로
import moim from "../assets/cha-bubbles-two-svgrepo-com.svg"; // 이미지 경로
import bin from "../assets/cle-dustpan-brush-svgrepo-com.svg"; // 이미지 경로
import { useEffect, useRef } from "react";

// 전체 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 위쪽에 정렬 */
  min-height: 80vh; /* 전체 화면의 80% 높이로 설정 */
  padding: 20px 20px 0 20px; /* 상단 패딩을 추가 */
  background-color: transparent;
  background-size: cover;
  background-position: center;
  color: #333;
`;
// 소개 컨테이너
const ServiceSection = styled.section`
  text-align: center;
  padding: 60px 0;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 5px solid #6bddc4; /* 밑줄 두께와 색상 설정 */
  padding-top: 10px; /* 텍스트와 밑줄 사이의 간격 */
  display: inline-block; /* 밑줄이 텍스트 길이에만 적용되도록 */
`;

const ServiceGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 카드를 위쪽에 정렬 */
  gap: 20px;
  margin-top: 40px;
`;

const ServiceCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 300px; /* 모든 카드의 고정 너비 */
  height: 300px; /* 모든 카드의 고정 높이 */

  /* 초기 상태 */
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  /* 요소가 화면에 나타날 때의 상태 */
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  img {
    width: 40%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 12px;
    object-fit: contain;
  }

  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #777;
  }
`;

export default function MainPage() {
  const serviceRef = useRef(null);

  useEffect(() => {
    const serviceCards = serviceRef.current.querySelectorAll(".service-card");
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 200); // 각 카드가 200ms 간격으로 나타나도록 설정
    });
  }, []);

  return (
    <MainContainer>
      <ServiceSection>
        <SectionTitle>에코넷에서 시작하기</SectionTitle>
        <ServiceGrid ref={serviceRef}>
          <ServiceCard className="service-card">
            <img src={news} alt="서비스 1" />
            <h3>소식 얻기</h3>
            <p>
              오늘의 미세먼지부터 세계 각지에서 일어나는 환경 소식을 실시간으로
              알려드려요.
            </p>
          </ServiceCard>
          <ServiceCard className="service-card">
            <img src={moim} alt="서비스 2" />
            <h3>참여하기</h3>
            <p>
              다른 유저들과 직접 주제를 정해 모임을 조직하고 참여할 수 있어요.
            </p>
          </ServiceCard>
          <ServiceCard className="service-card">
            <img src={bin} alt="서비스 3" />
            <h3>배출함 위치</h3>
            <p>주위에 있는 쓰레기, 어디에 버려야 할 지 고민하지 마세요!</p>
          </ServiceCard>
        </ServiceGrid>
      </ServiceSection>
    </MainContainer>
  );
}
