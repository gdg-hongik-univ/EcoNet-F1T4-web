import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 240px;
  height: 640px;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const SidebarItem = styled.li`
  padding: 15px;
  font-size: 1.5em;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const Sidebar = ({ setSelectedItem }) => {
  return (
    <SidebarContainer>
      <SidebarList>
        <SidebarItem onClick={() => setSelectedItem("battery")}>
          건전지
        </SidebarItem>
        <SidebarItem onClick={() => setSelectedItem("small")}>
          소형가전
        </SidebarItem>
        <SidebarItem onClick={() => setSelectedItem("lamp")}>
          형광등
        </SidebarItem>
        <SidebarItem onClick={() => setSelectedItem("oil")}>식용유</SidebarItem>
        <SidebarItem onClick={() => setSelectedItem("furniture")}>
          가구
        </SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
