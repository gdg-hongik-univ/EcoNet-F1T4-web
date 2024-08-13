const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

function NewsModal({ news, onClose }) {
  if (!news) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <h2>{news.newsTitle}</h2>
        <p>{news.newsText}</p>
        <img src={news.imgUrl} alt="뉴스 이미지" style={{ width: "100%" }} />
        <p>{news.date}</p>
        <button onClick={onClose}>닫기</button>
      </ModalContainer>
    </>
  );
}
