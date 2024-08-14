import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProfile } from "../api/getprofile";
import MyComments from "../components/MyComments";
import MyPosts from "../components/MyPosts";
import UserProfile from "../components/UserProfile";
import { changePassword } from "../api/changepassword";

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
  margin-top: 80px;
`;

// 사용자 프로필 래퍼 스타일 정의
const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 40px;
`;

// 입력 컨테이너 스타일 정의
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
  width: auto;
  height: auto;
  font-size: 24px;
  background-color: #6bddc4;
  border: none;
  border-radius: 5px;
  padding: 4px;
  cursor: pointer;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize};
  &:hover {
    color: #ffffff;
  }
`;

// 라벨 스타일 정의
const Label = styled.label`
  width: 200px;
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 32px;
`;

// 이메일 필드 스타일 정의 (읽기 전용)
const EmailField = styled.div`
  width: auto;
  height: 56px;
  border: 1px solid #6bddc4;
  border-radius: 5px;
  padding: 8px;
  margin-left: -40px;
  text-align: left;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 24px;
`;

// 입력 필드 스타일 정의
const Input = styled.input`
  width: 300px;
  border: 1px solid #6bddc4;
  border-radius: 5px;
  padding: 5px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize};
`;

// MyPage 컴포넌트 정의
export default function MyPage() {
  const [userProfile, setUserProfile] = useState(null); // 사용자 프로필 정보를 저장하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 비밀번호 변경 모달의 열림/닫힘 상태
  const [oldPassword, setOldPassword] = useState(""); // 현재 비밀번호를 저장하는 상태
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호를 저장하는 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인을 저장하는 상태
  const [error, setError] = useState(""); // 비밀번호 변경 시 발생한 오류 메시지를 저장하는 상태

  useEffect(() => {
    // 컴포넌트가 마운트될 때 사용자 프로필 데이터를 가져옴
    async function fetchData() {
      try {
        const data = await getProfile(); // getProfile API 호출
        setUserProfile(data); // 프로필 데이터를 상태에 저장
        console.log(data); // 데이터를 콘솔에 출력
      } catch (error) {
        console.error("Failed to fetch profile:", error.message); // 오류 발생 시 로그 출력
      }
    }
    fetchData(); // fetchData 함수 호출
  }, []);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true); // 모달을 열기 위해 상태를 true로 설정
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false); // 모달을 닫기 위해 상태를 false로 설정
    setOldPassword(""); // 현재 비밀번호 필드를 초기화
    setNewPassword(""); // 새 비밀번호 필드를 초기화
    setConfirmPassword(""); // 비밀번호 확인 필드를 초기화
    setError(""); // 오류 메시지를 초기화
  };

  // 비밀번호 변경 함수
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다."); // 새 비밀번호와 확인 비밀번호가 일치하지 않으면 오류 메시지 설정
      return;
    }

    try {
      const response = await changePassword(oldPassword, newPassword); // changePassword API 호출
      alert(response.detail); // 성공 메시지 출력
      closeModal(); // 모달을 닫음
    } catch (error) {
      // 오류 발생 시 오류 메시지 포맷팅
      let errorMessage = JSON.parse(error.message);
      let formattedError = "";
      if (typeof errorMessage === "object") {
        for (const key in errorMessage) {
          if (Array.isArray(errorMessage[key])) {
            formattedError +=
              errorMessage[key].join(" ").replace(/['"[\]]/g, "") + " ";
          } else {
            formattedError += errorMessage[key].replace(/['"[\]]/g, "") + " ";
          }
        }
      } else {
        formattedError = errorMessage.replace(/['"[\]]/g, "");
      }
      setError(formattedError.trim()); // 포맷팅된 오류 메시지를 설정
      console.error(error.message); // 오류 메시지를 콘솔에 출력
    }
  };

  // 사용자 프로필 데이터가 없으면 로딩 화면을 표시
  if (!userProfile) {
    return <div>Loading...</div>;
  }

  // MyPage 컴포넌트의 렌더링
  return (
    <MyPageContainer>
      <UserProfileWrapper>
        <UserProfile userName={userProfile.nickname} />{" "}
        {/* 사용자 프로필 컴포넌트 */}
        <InfoContainer>
          <InputContainer>
            <Label>Email :</Label>
            <EmailField>{userProfile.email}</EmailField> {/* 이메일 표시 */}
          </InputContainer>
          <InputContainer>
            <ChangeButton onClick={openModal}>비밀번호 변경하기</ChangeButton>{" "}
            {/* 비밀번호 변경 버튼 */}
          </InputContainer>
        </InfoContainer>
        {isModalOpen && (
          <>
            <Overlay onClick={closeModal} /> {/* 모달 뒤의 오버레이 */}
            <Modal>
              <h2>비밀번호 변경</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}{" "}
              {/* 오류 메시지 표시 */}
              <InputContainer>
                <Label>현재 비밀번호:</Label>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <Label>새 비밀번호:</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <Label>비밀번호 확인:</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputContainer>
              <ChangeButton onClick={handleChangePassword}>
                변경완료!
              </ChangeButton>
            </Modal>
          </>
        )}
      </UserProfileWrapper>

      <MyPostContainer>
        <MyPosts items={userProfile.posts} /> {/* 사용자의 게시물 리스트 */}
        <MyComments items={userProfile.comments} /> {/* 사용자의 댓글 리스트 */}
      </MyPostContainer>
    </MyPageContainer>
  );
}
