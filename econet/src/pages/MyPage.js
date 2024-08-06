import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  top: 80px;
  right: -40px;
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
  margin-top: 20px;
`;

// MyPage 컴포넌트 정의
export default function MyPage() {
  const [userProfile, setUserProfile] = useState(null); // 사용자 프로필 상태 정의
  const [loading, setLoading] = useState(true); // 로딩 상태 정의

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfile(); // 프로필 데이터 가져오기
        console.log("유저 프로필 데이터 받아오기 성공:", data); // 콘솔에 데이터 출력
        setUserProfile(data); // 사용자 프로필 상태 업데이트
      } catch (error) {
        console.error("유저 프로필 데이터 받아오기 실패:", error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    }
    fetchData(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  if (loading) {
    return <h1>Loading...</h1>; // 데이터 로딩 중 표시
  }

  if (!userProfile) {
    return (
      <div>
        {/* 유저 프로필 정보 로딩 실패시 */}
        <h1>프로필 데이터를 불러올 수 없습니다.</h1>;
        <Button to="/account">계정설정</Button>
      </div>
    );
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
