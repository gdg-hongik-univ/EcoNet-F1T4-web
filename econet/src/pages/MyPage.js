import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getProfile } from "../api/getprofile"; // 경로가 올바른지 확인
import MyComments from "../components/MyComments";
import MyPosts from "../components/MyPosts";
import UserProfile from "../components/UserProfile";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const UserIntro = styled.p`
  width: 400px;
  text-align: center;
  border-radius: 16px;
  border: 1px solid #6bddc4;
`;

const MyPostContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const Button = styled(Link)`
  width: 120px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #6bddc4;
  font-size: 16px;
  font-weight: 600;
`;

export default function MyPage() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfile();
        setUserProfile(data);
        console.log(data); // 데이터를 콘솔에 출력
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
    fetchData();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <MyPageContainer>
      <UserProfile userImg={userProfile.img} userName={userProfile.name} />
      <UserIntro>{userProfile.intro}</UserIntro>
      <Button to="/account">계정설정</Button>

      <MyPostContainer>
        <MyComments />
        <MyPosts />
      </MyPostContainer>
    </MyPageContainer>
  );
}
