import "../styles/econewspage/econewspage-styles.css";

// 환경 뉴스 컴포넌트 {이미지, 본문, 공유 아이콘}
export default function EcoNews({ imgUrl, newsText = "뉴스 내용" }) {
  // 뉴스 이미지와 텍스트를 받는 prop 설정, 나중에 백엔드가 주는 데이터에 따라 변경 가능
  return (
    <div className="econews-style">
      <img src={imgUrl} alt="뉴스 이미지"></img>
      <p>{newsText}</p>
      <button>공유</button>
    </div>
  );
}
