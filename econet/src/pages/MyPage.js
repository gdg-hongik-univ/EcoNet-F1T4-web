import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getProfile } from "../api/getprofile"; // getProfile 함수 임포트
import MyComments from "../components/MyComments"; // MyComments 컴포넌트 임포트
import MyPosts from "../components/MyPosts"; // MyPosts 컴포넌트 임포트
import UserProfile from "../components/UserProfile"; // UserProfile 컴포넌트 임포트

// 페이지 전체 컨테이너 스타일 정의
const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// 사용자 소개 스타일 정의
const UserIntro = styled.p`
  width: 400px;
  text-align: center;
  border-radius: 16px;
  border: 1px solid #6bddc4;
`;

// 게시물 컨테이너 스타일 정의
const MyPostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
`;

// 계정 설정 버튼 스타일 정의
const Button = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 120px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #6bddc4;
  font-size: 16px;
  font-weight: 600;
`;

// 사용자 프로필 래퍼 스타일 정의
const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 20px;
`;

// MyPage 컴포넌트 정의
export default function MyPage() {
  const [userProfile, setUserProfile] = useState(null); // 사용자 프로필 상태 정의

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfile(); // 프로필 데이터 가져오기
        console.log("Fetched profile data:", data); // 콘솔에 데이터 출력
        setUserProfile(data); // 사용자 프로필 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
    fetchData(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  if (!userProfile) {
    return <h1>Loading...</h1>; // 데이터 로딩 중 표시
  }

  return (
    <MyPageContainer>
      <UserProfileWrapper>
        {/* UserProfile 컴포넌트에 이미지와 이름 전달 */}
        <UserProfile
          userImg={userProfile.profile_picture}
          userName={userProfile.nickname}
        />
        <UserIntro>{userProfile.intro}</UserIntro>
        <Button to="/account">계정설정</Button>
      </UserProfileWrapper>

      <MyPostContainer>
        {/* MyPosts와 MyComments 컴포넌트에 데이터 전달 */}
        <MyPosts items={userProfile.posts || []} />
        <MyComments items={userProfile.comments || []} />
      </MyPostContainer>
    </MyPageContainer>
  );
}
