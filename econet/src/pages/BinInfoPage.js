import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../atom/atoms"; // Recoil 상태 임포트
import ImageModal from "../components/ImageModal";
import LocationCommentList from "../components/LocationCommentList";
import LocationCommentInput from "../components/LocationCommentInput";
import { getBinInfo } from "../api/getbininfo"; // getBinInfo 함수 임포트

const MainBox = styled.div`
  width: 1000px;
  margin: 32px auto;
`;

const BinName = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Address = styled.div`
  font-size: 20px;
  margin-bottom: 24px;
`;

const ImageFrame = styled.div`
  display: grid;
  grid-template:
    242px 242px /
    494px 242px 242px;
  gap: 11px;
  margin-bottom: 20px;
`;

const MainImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  grid-row: 1/3;
  grid-column: 1/2;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const StyledLi = styled.li`
  font-size: 18px;
  margin: 8px 0;
`;

const LocationInfo = styled.div`
  margin-top: 64px;
  margin-bottom: 26px;
  font-size: 24px;
  font-weight: 500;
`;

function BinInfoPage() {
  const baseUrl = "https://13.124.235.155.nip.io";

  const [binData, setBinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { binId } = useParams();
  const isLoggedIn = useRecoilValue(isLoggedInState); // 로그인 상태 가져오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBinInfo(binId);
        setBinData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [binId]);

  const handleImageUpload = (newImage) => {
    setBinData((prevData) => ({
      ...prevData,
      pictures: prevData.pictures.map((pic) =>
        pic.picture_id === newImage.picture_id
          ? { ...pic, picture: newImage.picture }
          : pic
      ),
    }));
  };

  const handleCommentAdded = () => {
    const fetchComments = async () => {
      try {
        const data = await getBinInfo(binId);
        setBinData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchComments();
  };

  const handleModalOpen = () => {
    if (!isLoggedIn) {
      alert("로그인 후에 사진을 업로드할 수 있습니다.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // 사진이 5개 이상인지 확인
  const isUploadAllowed = binData.pictures.length < 5;

  return (
    <MainBox>
      <BinName>{binData.category}</BinName>
      <Address>{binData.location}</Address>
      <ImageFrame>
        {binData.pictures.length > 0 ? (
          <>
            {binData.pictures[0].picture ? (
              <MainImage
                src={`${baseUrl}${binData.pictures[0].picture}`}
                alt="메인 이미지"
              />
            ) : (
              <p>메인 이미지 없음</p>
            )}
            {binData.pictures
              .slice(1)
              .map((pic) =>
                pic.picture ? (
                  <StyledImage
                    key={pic.picture_id}
                    src={`${baseUrl}${pic.picture}`}
                    alt={`이미지 ${pic.picture_id}`}
                  />
                ) : (
                  <p key={pic.picture_id}>이미지 없음</p>
                )
              )}
          </>
        ) : (
          <p>이미지를 등록해 주세요!</p>
        )}
        {/* 이미지가 5개 미만일 때만 ImageModal 컴포넌트 렌더링 */}
        {isUploadAllowed && (
          <ImageModal
            images={binData.pictures}
            binId={binId}
            onImageUpload={handleImageUpload}
            isLoggedIn={isLoggedIn}
            onOpen={handleModalOpen}
          />
        )}
      </ImageFrame>
      <ul>
        <StyledLi>수거대상 품목: {binData.acceptible}</StyledLi>
        <StyledLi>수거불가 품목: {binData.unacceptible}</StyledLi>
      </ul>
      <LocationInfo>위치 정보</LocationInfo>
      <LocationCommentList comments={binData.information} />
      <LocationCommentInput binId={binId} onCommentAdded={handleCommentAdded} />
    </MainBox>
  );
}

export default BinInfoPage;
