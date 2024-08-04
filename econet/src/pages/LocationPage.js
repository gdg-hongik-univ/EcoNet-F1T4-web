import React, { useState } from "react";
import styled from "styled-components";
import Map from "../components/Map";
import Select from "../components/Select";
import CheckBox from "../components/CheckBox";

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
`;

const SideBar = styled.div`
  background-color: #ffffff;
  width: 300px;
  flex-shrink: 0;
  box-shadow: -4px 1px 8px 3px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 20px;
  position: relative;
`;

const StyledSelect = styled(Select)`
  padding: 4px 10px 5px 4px;
  font-size: 16px;
  border-radius: 3px;
  width: 100%;
  display: block;
`;

const CheckBoxList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const StyledCheckBox = styled(CheckBox)`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #c8c8c8;
  padding: 10px 0 12px;

  & input {
    width: 18px;
    height: 18px;
    margin: 2px 10px 0 14px;
  }

  & label {
    margin: 0;
    font-size: 18px;
  }
`;

const ToThrowAwayMethodPage = styled.div`
  position: absolute;
  bottom: 25px;
  right: 20px;
  color: #6bddc4;
  font-size: 15px;
  font-weight: 600;
`;

function LocationPage() {
  return (
    <>
      <ContentBox>
        <Title>배출함 위치 찾아보기</Title>
        <StyledMap />
        <SideBar>
          <StyledSelect />
          <CheckBoxList>
            <StyledCheckBox name="bin" value="cloth" title="의류" />
            <StyledCheckBox name="bin" value="medicine" title="폐의약품" />
            <StyledCheckBox
              name="bin"
              value="batterybulb"
              title="폐건전지, 폐형광등"
            />
          </CheckBoxList>
          <ToThrowAwayMethodPage>
            자세한 배출 방법이 궁금하다면?
          </ToThrowAwayMethodPage>
        </SideBar>
      </ContentBox>
    </>
  );
}

export default LocationPage;
