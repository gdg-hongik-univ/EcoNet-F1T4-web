import { useEffect, useRef } from "react";

function Map({ className }) {
  const mapRef = useRef(null);
  const { naver } = window;

  useEffect(() => {
    // 네이버 지도 옵션 선택
    const mapOptions = {
      // 지도의 초기 중심 좌표
      center: new naver.maps.LatLng(37.5585259, 126.9157857),

      mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
      scaleControl: true, // 지도 축척 컨트롤의 표시 여부
      tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
      zoom: 14, // 지도의 초기 줌 레벨
      zoomControl: false, // 줌 컨트롤 표시
    };
    mapRef.current = new naver.maps.Map("map", mapOptions);
  }, []);

  return <div id="map" className={className} />;
}

export default Map;
