import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import UserProfile from "../components/UserProfile";
import { getProfile } from "../api/getprofile";
import { Button } from "@mui/material";

// 테마 정의
const theme = {
  fontFamily: "'Noto Sans KR', sans-serif",
  fontSize: "20px",
  color: "#333",
};

// 계정 설정 페이지 전체 컨테이너 스타일 정의
const AccountSettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize};
  color: ${(props) => props.theme.color};
`;

// 프로필 컨테이너 스타일 정의
const ProfileContainer = styled.div`
  position: relative;
  top: 20px;
  margin-bottom: 20px;
`;

// 입력 컨테이너 스타일 정의
const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 560px;
  margin: 16px 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 80px;
`;

// 모달 스타일 정의
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560px;
  background-color: white;
  padding: 20px;
  border: 2px solid #6bddc4;
  border-radius: 10px;
  z-index: 1000;
`;

// 모달 오버레이 스타일 정의 (모달 뒤의 어두운 배경)
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// 변경하기 버튼 스타일 정의
const ChangeButton = styled.button`
  width: 96px;
  height: 36px;
  background-color: #6bddc4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize};
  &:hover {
    color: #ffffff;
  }
`;

// 라벨 스타일 정의
const Label = styled.label`
  width: 160px;
  text-align: right;
  padding: 8px 8px 0 0;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 24px;
`;

// 이메일 필드 스타일 정의 (읽기 전용)
const EmailField = styled.div`
  width: 240px;
  height: 56px;
  border: 1px solid #6bddc4;
  border-radius: 5px;
  padding: 5px;
  text-align: left;
  padding-left: 10px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 24px;
`;

// 입력 필드 스타일 정의
const Input = styled.input`
  width: 360px;
  margin-top: 24px;
  border: 1px solid #6bddc4;
  border-radius: 5px;
  padding: 5px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize};
`;

export default function AccountSettingPage() {
  const [userProfile, setUserProfile] = useState(null); // 사용자 프로필 상태 정의
  const [loading, setLoading] = useState(true); // 로딩 상태 정의
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AccountSettingContainer>
        <ProfileContainer>
          <UserProfile
            userImg={userProfile.profile_picture}
            userName={userProfile.nickname}
          />
        </ProfileContainer>
        <InfoContainer>
          <InputContainer>
            <Label>Email :</Label>
            <EmailField>{userProfile.email}</EmailField>
          </InputContainer>
          <InputContainer>
            <Label>PW :</Label>
            <ChangeButton onClick={openModal}>변경하기</ChangeButton>
          </InputContainer>
        </InfoContainer>
        {isModalOpen && (
          <>
            <Overlay onClick={closeModal} />
            <Modal>
              <h2>비밀번호 변경</h2>
              <InputContainer>
                <Label>현재 비밀번호:</Label>
                <Input type="password" />
              </InputContainer>
              <InputContainer>
                <Label>새 비밀번호:</Label>
                <Input type="password" />
              </InputContainer>
              <InputContainer>
                <Label>비밀번호 확인:</Label>
                <Input type="password" />
              </InputContainer>
              <ChangeButton onClick={closeModal}>변경완료!</ChangeButton>
            </Modal>
          </>
        )}
      </AccountSettingContainer>
    </ThemeProvider>
  );
}
