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
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 2px solid #6bddc4;
  margin-bottom: 10px;
`;

// 사용자 이름 스타일 정의
const UserName = styled.h2`
  font-size: 20px;
  border: 1px solid #6bddc4;
  border-radius: 16px;
  padding: 8px;
`;

// UserProfile 컴포넌트 정의
export default function UserProfile({ userImg, userName }) {
  return (
    <ProfileContainer>
      <ProfileImage
        src={userImg || "https://via.placeholder.com/100"}
        alt="User Profile"
      />
      <UserName>{userName}</UserName>
    </ProfileContainer>
  );
}
