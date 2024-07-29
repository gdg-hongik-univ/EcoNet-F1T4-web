import UserProfile from "../components/UserProfile";
import styled from "styled-components";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// 자기소개
const UserIntro = styled.p`
  width: 400px;
  text-align: center;
  border-radius: 16px;
  border: 1px solid #6bddc4;
`;

// 유저 자기소개. 데이터 받아와서 초기화 예정
const userIntro = `유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개`;

export default function MyPage() {
  return (
    <MyPageContainer>
      <UserProfile />
      <UserIntro>{userIntro}</UserIntro>
      <button>계정설정</button>
      <button>프로필 변경</button>
    </MyPageContainer>
  );
}
