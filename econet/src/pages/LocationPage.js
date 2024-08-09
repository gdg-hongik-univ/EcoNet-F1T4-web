import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Map from "../components/Map";
import Select from "../components/Select";
import CheckBox from "../components/CheckBox";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const ToGarbageDisposalPage = styled.button`
  border: 0;
  background-color: transparent;
  position: absolute;
  bottom: 25px;
  right: 20px;
  color: #6bddc4;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

function LocationPage() {
  const navigate = useNavigate();

  const goGarbage = () => {
    navigate("/garbage");
  };

  const [dong, setDong] = useState({
    latitude: 37.54932,
    longitude: 126.9579,
  });

  const handleSelectChange = (e) => {
    const nextdong = e.target.value.split(",");
    setDong((dong) => ({
      ...dong,
      latitude: nextdong[0],
      longitude: nextdong[1],
    }));
  };

  const [check, setCheck] = useState([]);

  const handleCheckChange = (checked, value) => {
    if (checked) {
      setCheck((prev) => [value, ...prev]);
    } else {
      setCheck(check.filter((el) => el !== value));
    }
  };

  const queryClient = new QueryClient();

  return (
    <>
      <ContentBox>
        <Title>배출함 위치 찾아보기</Title>
        <QueryClientProvider client={queryClient}>
          <StyledMap lat={dong.latitude} lng={dong.longitude} bin={check} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

        <SideBar>
          <StyledSelect onChange={handleSelectChange} />
          <CheckBoxList>
            <StyledCheckBox
              name="bin"
              value="의류수거함"
              title="의류 수거함"
              checked={check.includes("의류수거함")}
              onChange={(e) =>
                handleCheckChange(e.target.checked, e.target.value)
              }
            />
            <StyledCheckBox
              name="bin"
              value="폐건전지, 폐형광등 수거함"
              title="폐건전지, 폐형광등 수거함"
              checked={check.includes("폐건전지, 폐형광등 수거함")}
              onChange={(e) =>
                handleCheckChange(e.target.checked, e.target.value)
              }
            />
            <StyledCheckBox
              name="bin"
              value="폐의약품"
              title="폐의약품 수거함"
              checked={check.includes("폐의약품")}
              onChange={(e) =>
                handleCheckChange(e.target.checked, e.target.value)
              }
            />
            <StyledCheckBox
              name="bin"
              value="담배꽁초"
              title="담배꽁초 수거함"
              checked={check.includes("담배꽁초")}
              onChange={(e) =>
                handleCheckChange(e.target.checked, e.target.value)
              }
            />
          </CheckBoxList>
          <ToGarbageDisposalPage onClick={goGarbage}>
            자세한 배출 방법이 궁금하다면?
          </ToGarbageDisposalPage>
        </SideBar>
      </ContentBox>
    </>
  );
}

export default LocationPage;
