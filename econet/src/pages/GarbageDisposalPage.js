import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { useState } from "react";

const PageContainer = styled.div`
  display: flex;
  align-items: stretch; /* Align items to stretch to fill container height */
  padding: 20px; /* Add some padding around the container */
`;

const SidebarContainer = styled.div`
  position: relative;
  left: 40px;
`;

const SidebarTitle = styled.h1`
  text-align: center;
  font-weight: 600;
`;
// 쓰레기 배출 방법 페이지
export default function GarbageDisposalPage() {
  const [selectedItem, setSelectedItem] = useState("");
  return (
    <PageContainer>
      <SidebarContainer>
        <SidebarTitle>종류별 배출방법</SidebarTitle>
        <Sidebar setSelectedItem={setSelectedItem} />
      </SidebarContainer>
      <Content selectedItem={selectedItem} />
    </PageContainer>
  );
}
