import React from "react";
import styled from "styled-components";

// 프로필 컨테이너 스타일 정의
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 프로필 이미지 스타일 정의
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #6bddc4;
  margin-bottom: 10px;
`;

// 사용자 이름 스타일 정의
const UserName = styled.h2`
  font-size: 20px;
  margin: 0;
`;

// UserProfile 컴포넌트 정의
export default function UserProfile({ userImg, userName }) {
  console.log("UserProfile props:", { userImg, userName }); // 전달된 props를 콘솔에 출력
  return (
    <ProfileContainer>
      {/* 사용자 프로필 이미지와 이름 표시 */}
      <ProfileImage src={userImg} alt="User Profile" />
      <UserName>{userName}</UserName>
    </ProfileContainer>
  );
}
