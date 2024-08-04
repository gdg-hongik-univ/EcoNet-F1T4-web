import Modal from "react-modal";
import styled from "styled-components";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImageList from "./ImageList";

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
  font-size: 48px;
  font-weight: 400;
  color: #757575;
  background-color: transparent;
  line-height: 1;
  padding: 0;
  float: right;
`;

function ImageModal({ images }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      width: "900px",
      height: "800px",
      margin: "auto",
      padding: "15px 35px",
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
        <ImageUpload />
        <ImageList images={images} />
      </Modal>
    </>
  );
}

export default ImageModal;
