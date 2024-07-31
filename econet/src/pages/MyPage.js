import MyComments from "../components/MyComments";
import MyPosts from "../components/MyPosts";
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

const MyContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

// 유저 자기소개. 데이터 받아와서 초기화 예정
const userIntro = `유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개 유저 자기소개`;

export default function MyPage() {
  return (
    <MyPageContainer>
      <UserProfile userTier={""} userImg={""} userName={"Steve"} />
      <UserIntro>{userIntro}</UserIntro>
      <button>계정설정</button>
      <button>프로필 변경</button>
      <MyContainer>
        {/* <MyComments />
        <MyPosts /> */}
      </MyContainer>
    </MyPageContainer>
  );
}
