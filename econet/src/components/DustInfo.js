import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Info from "../styles/todaypage/Info";

const apiKey =
  "aNNAECxRh6%2BzQDIQC07X2QHoHWNGXh8%2BVzUuNrHh40mUSHq%2FJPsIGexrj5QdnZSEt2POQsOnvRvwaFO8j08mTg%3D%3D"; // 여기에 발급받은 API 키를 입력합니다.
const returnType = "json"; // 데이터를 JSON 형식으로 받아옵니다.
const numOfRows = 100; // 한 페이지 결과 수
const pageNo = 1; // 페이지번호
const ver = "1.0"; // 버전
const city = "서울"; // 시도 이름

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  margin: 20px 0;
`;

const DustInfo = () => {
  const [stationName, setStationName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
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
          (item) => item.stationName === stationName
        );
        setData(filteredData);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Container>
      <FormContainer id="formContainer">
        <input
          type="text"
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
          placeholder="측정소 이름을 입력하세요"
        />
        <button onClick={fetchData}>조회</button>
      </FormContainer>
      {error && <p>오류가 발생했습니다: {error.message}</p>}
      {data && (
        <div>
          <h2>오늘의 환경</h2>
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index}>
                <p>측정소 이름: {item.stationName}</p>
                <p>측정 시간: {item.dataTime}</p>
                <p>
                  PM10: {item.pm10Value} ({item.pm10Grade})
                </p>
                <p>
                  PM2.5: {item.pm25Value} ({item.pm25Grade})
                </p>
                <p>
                  O3: {item.o3Value} ({item.o3Grade})
                </p>
                <p>
                  NO2: {item.no2Value} ({item.no2Grade})
                </p>
                <p>
                  SO2: {item.so2Value} ({item.so2Grade})
                </p>
                <p>
                  CO: {item.coValue} ({item.coGrade})
                </p>
                <p>
                  통합대기환경지수: {item.khaiValue} ({item.khaiGrade})
                </p>
              </div>
            ))
          ) : (
            <p>해당 측정소의 데이터를 찾을 수 없습니다.</p>
          )}
        </div>
      )}
    </Container>
  );
};

export default DustInfo;
