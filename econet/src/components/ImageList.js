import styled from "styled-components";

const ImageFrame = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`;

function ImageList({ images }) {
  return (
    <ImageFrame>
      {images.map((item) => (
        <StyledImage key={item.picture_id} src={item.picture} alt="이미지" />
      ))}
    </ImageFrame>
  );
}

export default ImageList;
