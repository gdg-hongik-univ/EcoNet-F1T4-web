import EcoPartyIcon from "./EcoPartyIcon";

// CSS
import "../styles/econewspage/econewspage-styles.css";

// 환경소식 페이지 최하단에 있는 환경 단체 리스트
export default function EcoPartyList() {
  return (
    <div className="ecoparty-list-box">
      <p>
        함께해요!
        <br /> 환경단체
      </p>
      <EcoPartyIcon />
      <EcoPartyIcon />
      <EcoPartyIcon />
      <EcoPartyIcon />
      <EcoPartyIcon />
    </div>
  );
}
