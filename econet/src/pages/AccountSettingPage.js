import styled from "styled-components";
import UserProfile from "../components/UserProfile";
import SettingPage from "./SettingPage";

export default function AccountSettingPage() {
  return (
    <div>
      <UserProfile userTier={""} userImg={""} userName={"Steve"} />
      <SettingPage />
    </div>
  );
}
