import { useEffect, useState } from "react";
import styled from "styled-components";
import { getProfile } from "../api/getprofile";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// 유저 이미지
const UserImg = styled.img`
  width: 240px; /* 원하는 크기로 설정하세요 */
  height: 240px; /* 원하는 크기로 설정하세요 */
  border-radius: 50%;
  object-fit: cover; /* 이미지 비율을 유지하면서 크기에 맞춤 */
  border: 2px solid #000000;
  display: block; /* 부모 요소의 영향을 받지 않도록 블록 요소로 설정 */
`;

// 유저이름
const UserName = styled.h2`
  width: 160px;
  height: 40px;
  background-color: #c4c4c4;
  border-radius: 16px;
`;

// 유저 프로필 정보를 보여주는 컴포넌트
// 유저 티어(메달), 유저이름, 프로필사진, 자기소개
export default function UserProfile({ userImg, userName }) {
  return (
    <ProfileContainer>
      <UserImg src={userImg} alt="유저 이미지" />
      <UserName>{userName}</UserName>
    </ProfileContainer>
  );
}
