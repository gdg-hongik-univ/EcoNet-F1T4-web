import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const apiKey =
  "aNNAECxRh6%2BzQDIQC07X2QHoHWNGXh8%2BVzUuNrHh40mUSHq%2FJPsIGexrj5QdnZSEt2POQsOnvRvwaFO8j08mTg%3D%3D";
const returnType = "json";
const numOfRows = 100;
const pageNo = 1;
const ver = "1.0";
const city = "서울";

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  margin: 20px 0;
`;

const StyledButton = styled.button`
  display: block;
  width: 100%;
  height: 60px;
  margin-top: 5px;
  border: 0;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;

  ${(props) =>
    props.disabled
      ? css`
          background-color: #d9d9d9;
          cursor: not-allowed;
        `
      : css`
          background-color: #6bddc4;
        `}
`;

const InfoBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f6f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  margin-top: 20px;

  h2 {
    margin-top: 0;
  }

  p {
    margin: 5px 0;
  }
`;

const Dropdown = styled.select`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
`;

const getColorForPm10 = (value) => {
  if (value <= 30) return "#26A8E2";
  if (value <= 80) return "#8CC53E";
  if (value <= 150) return "#FCB11B";
  return "#EE1D23";
};

const getColorForPm25 = (value) => {
  if (value <= 15) return "#26A8E2";
  if (value <= 35) return "#8CC53E";
  if (value <= 75) return "#FCB11B";
  return "#EE1D23";
};

const BoldText = styled.span`
  font-weight: bold;
`;

const DustInfo = () => {
  const [stationName, setStationName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = () => {
      const apiUrl = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${city}&serviceKey=${apiKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&ver=${ver}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          const uniqueStations = [
            ...new Set(
              data.response.body.items.map((item) => item.stationName)
            ),
          ];
          setStations(uniqueStations);
        })
        .catch((error) => {
          setError(error);
        });
    };

    fetchStations();
  }, []);

  const fetchData = (selectedStation) => {
    const apiUrl = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${city}&serviceKey=${apiKey}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&ver=${ver}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const filteredData = data.response.body.items.filter(
          (item) => item.stationName === selectedStation
        );
        setData(filteredData);
        setStationName(selectedStation);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Container>
      <FormContainer id="formContainer">
        <Dropdown
          value={stationName}
          onChange={(e) => fetchData(e.target.value)}
        >
          <option value="">측정소를 선택하세요</option>
          {stations.map((station, index) => (
            <option key={index} value={station}>
              {station}
            </option>
          ))}
        </Dropdown>

        {error && <p>오류가 발생했습니다: {error.message}</p>}
        {data && (
          <InfoBox>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index}>
                  <p>
                    {" "}
                    <BoldText>{item.stationName}</BoldText>에 있는 측정소에서
                    관측된 값은
                  </p>

                  <p>
                    <BoldText>미세먼지 </BoldText>
                    <span style={{ color: getColorForPm10(item.pm10Value) }}>
                      {item.pm10Value}
                    </span>
                  </p>
                  <p>
                    <BoldText>초미세먼지 </BoldText>
                    <span style={{ color: getColorForPm25(item.pm25Value) }}>
                      {item.pm25Value}
                    </span>
                  </p>
                  <p>{item.dataTime}에 마지막으로 측정되었습니다.</p>
                </div>
              ))
            ) : (
              <p>측정소를 선택해 주세요.</p>
            )}
          </InfoBox>
        )}
      </FormContainer>
    </Container>
  );
};

export default DustInfo;
