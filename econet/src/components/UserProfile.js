import React from "react";
import styled from "styled-components";

// 프로필 컨테이너 스타일 정의
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 사용자 이름 스타일 정의
const UserName = styled.h2`
  font-size: 32px;
  width: 200px;
  border: 3px solid #6bddc4;
  border-radius: 16px;
  padding: 8px;
`;

// UserProfile 컴포넌트 정의
export default function UserProfile({ userImg, userName }) {
  return (
    <ProfileContainer>
      <UserName>{userName}</UserName>
    </ProfileContainer>
  );
}
