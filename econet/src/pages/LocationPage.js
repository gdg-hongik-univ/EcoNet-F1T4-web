import React, { useState } from "react";
import styled from "styled-components";
import Map from "../components/Map";
import Select from "../components/Select";

const Title = styled.div`
  position: absolute;
  top: -85px;
  left: 0;
  font-size: 36px;
  font-weight: 700;
`;

const ContentBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 120px;
  width: 1300px;
  box-shadow: -5px 5px 8px 3px rgba(0, 0, 0, 0.3);
`;

const StyledMap = styled(Map)`
  width: 1000px;
  height: 650px;
  flex-shrink: 0;
`;

const SideBar = styled.div`
  background-color: #ffffff;
  width: 300px;
  flex-shrink: 0;
  box-shadow: -4px 1px 8px 3px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

function LocationPage() {
  return (
    <>
      <ContentBox>
        <Title>배출함 위치 찾아보기</Title>
        <StyledMap />
        <SideBar>
          <Select />
        </SideBar>
      </ContentBox>
    </>
  );
}

export default LocationPage;
