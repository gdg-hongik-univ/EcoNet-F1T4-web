import Modal from "react-modal";
import styled from "styled-components";
import { useState } from "react";
import ImageUpload from "./ImageUpload";

const ModalButton = styled.button`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border: 0;
  font-size: 120px;
  color: #ffffff;
  background-color: #c6c6c6;
  padding-bottom: 20px;
`;

const CloseButton = styled.button`
  border: 0;
  font-size: 25px;
  font-weight: 400;
  color: #757575;
  background-color: transparent;
  line-height: 1;
  padding: 0;
  float: right;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 50px); // Adjust to fit within the modal
`;

const DisplayImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

function ImageModal({ images, binId, onImageUpload, isLoggedIn, onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const openModal = () => {
    if (isLoggedIn) {
      setIsOpen(true);
    } else {
      onOpen(); // 로그인되어 있지 않으면 onOpen 호출
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUploadSuccess = (newImage) => {
    setUploadedImage(newImage); // Set the uploaded image to state
    if (onImageUpload) {
      onImageUpload(newImage);
    }
    closeModal(); // Close the modal after upload
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      width: "600px", // Adjusted width
      height: "200px", // Adjusted height
      margin: "auto",
      padding: "15px",
    },
  };

  return (
    <>
      <ModalButton onClick={openModal}>+</ModalButton>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        ariaHideApp={false}
      >
        <CloseButton onClick={closeModal}>x</CloseButton>
        <ImageUpload binId={binId} onUploadSuccess={handleUploadSuccess} />
        {/* {uploadedImage && (
          <ImageContainer>
            <DisplayImage
              src={URL.createObjectURL(uploadedImage)}
              alt="Uploaded"
            />
          </ImageContainer>
        )} */}
      </Modal>
    </>
  );
}

export default ImageModal;
