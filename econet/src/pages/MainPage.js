import styled from "styled-components";
// import backgroundImg from "../assets/mainpage-background.jpg"; // 배경 이미지 추가
import ecoImg from "../assets/mainpage-menu-ecoinfo.jpg"; // 이미지 경로

// 전체 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 20px;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  color: #333;
`;

// 소개 컨테이너
const IntroductionContainer = styled.div`
  text-align: center;
  max-width: 600px;
  background-color: #f7f6f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 소개 텍스트
const Introduction = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 20px 0;
  line-height: 1.6; // 줄 간격 조정
`;

// 시작하기 버튼
const StartButton = styled.button`
  background-color: #56d8bc;
  color: white;
  font-size: 18px;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45b99f;
  }
`;

// 반응형 스타일 추가
const ResponsiveContainer = styled(MainContainer)`
  @media (max-width: 768px) {
    ${Introduction} {
      font-size: 24px;
      margin: 10px 0;
    }

    ${IntroductionContainer} {
      padding: 20px;
    }
  }
`;
export default function MainPage() {
  return (
    <ResponsiveContainer>
      <IntroductionContainer>
        <Introduction>
          환영합니다!
          <br />
          서로 힘을 합쳐 우리의 지구를 지켜요.
        </Introduction>
        <StartButton>지금 시작하기</StartButton>
      </IntroductionContainer>
    </ResponsiveContainer>
  );
}
