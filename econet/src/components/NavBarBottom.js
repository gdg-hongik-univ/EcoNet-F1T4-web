import "../styles/navbar-bottom-styles.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { FaGithub } from "react-icons/fa"; // 깃허브 아이콘 추가
import styled from "styled-components";

// 모달 스타일 설정
const customStyles = {
  content: {
    width: "90%",
    maxWidth: "300px",
    maxHeight: "80vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    overflow: "auto",
  },
};

// 모달의 루트 엘리먼트 설정
Modal.setAppElement("#root");

// 스타일 정의
const ModalContent = styled.div`
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  color: #333;

  .team {
    margin-bottom: 20px;
  }

  .team-title {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #56d8bc;
    border-bottom: 1px solid #56d8bc;
    padding-bottom: 5px;
  }

  p {
    margin: 0 0 10px 0;
  }

  a {
    color: #56d8bc;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: black;
    }

    svg {
      margin-right: 8px;
      vertical-align: middle;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
`;

export default function NavBarBottom() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="navbar-bottom">
      <button className="button-styles">개인정보처리방침</button>
      <button className="button-styles">약관</button>
      <button className="button-styles">저작권</button>
      <button className="button-styles" onClick={openModal}>
        개발팀
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="개발팀 정보"
      >
        <ModalContent>
          <CloseButton onClick={closeModal}>x</CloseButton>

          <div className="team">
            <div className="team-title">서버</div>
            <p>
              정원희{" "}
              <a
                href="https://github.com/oneeee822"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </p>
            <p>
              이종훈{" "}
              <a
                href="https://github.com/goldenGlow21"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </p>
          </div>

          <div className="team">
            <div className="team-title">웹</div>
            <p>
              장지훈{" "}
              <a
                href="https://github.com/huni77"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </p>
            <p>
              박지원{" "}
              <a
                href="https://github.com/05ovo2e"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </p>
            <p>
              박민서{" "}
              <a
                href="https://github.com/minseo6753"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </p>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
