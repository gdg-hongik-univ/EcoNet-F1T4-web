import styled from "styled-components";
import UserProfile from "../components/UserProfile";
import SettingPage from "./SettingPage";

const AccountSettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const ProfileContainer = styled.div`
  position: relative;
  top: 40px;
`;

const SettingContainer = styled.div`
  position: relative;
  bottom: 120px;
`;

export default function AccountSettingPage() {
  return (
    <AccountSettingContainer>
      <ProfileContainer>
        <UserProfile userTier={""} userImg={""} userName={"Steve"} />
      </ProfileContainer>
      <SettingContainer>
        <SettingPage />
      </SettingContainer>
    </AccountSettingContainer>
  );
}
