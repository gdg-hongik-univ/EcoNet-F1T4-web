import React, { useState } from "react";
import styled from "styled-components";
import Map from "../components/Map";

const Title = styled.div`
  margin: 40px 60px;
  font-size: 36px;
  font-weight: 700;
`;

const StyledMap = styled(Map)`
  width: 1000px;
  height: 600px;
  margin: 0 auto;
`;

function LocationPage() {
  return (
    <>
      <Title>배출함 위치 찾아보기</Title>
      <StyledMap />
    </>
  );
}

export default LocationPage;
