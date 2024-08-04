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
      {images.map((item) => {
        return <StyledImage key={item.id} src={item.url} alt="이미지" />;
      })}
    </ImageFrame>
  );
}

export default ImageList;
