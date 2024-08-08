import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProfile } from "../api/getprofile"; // getprofile 함수 임포트
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

// 게시물 컨테이너 스타일 정의
const MyPostContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 64px;
  width: 80%;
  margin-top: 40px;
`;

// 계정 설정 버튼 스타일 정의
const Button = styled(Link)`
  position: absolute;
  top: 60px;
  left: 200px;
  width: 120px;
  height: 40px;
  text-align: center;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #6bddc4;
  font-size: 20px;
  font-weight: 600;
  &:hover {
    color: #6bddc4;
  }
`;

// 사용자 프로필 래퍼 스타일 정의
const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 40px;
`;

// MyPage 컴포넌트 정의
export default function MyPage() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfile();
        setUserProfile(data);
        console.log(data); // 데이터를 콘솔에 출력
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
      }
    }
    fetchData();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <MyPageContainer>
      <UserProfileWrapper>
        <UserProfile
          userImg={userProfile.image}
          userName={userProfile.nickname}
        />
        <Button to="/account">계정설정</Button>
      </UserProfileWrapper>

      <MyPostContainer>
        <MyPosts items={userProfile.posts} />
        <MyComments items={userProfile.comments} />
      </MyPostContainer>
    </MyPageContainer>
  );
}
