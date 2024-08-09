import { useEffect, useRef, useState } from "react";

const { naver } = window;

const loca = {
  latitude: 37.54932,
  longitude: 126.9579,
};

function Map({ lat, lng, className }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapOptions = {
      // 지도의 초기 중심 좌표
      center: new naver.maps.LatLng(loca.latitude, loca.longitude),
      mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
      scaleControl: true, // 지도 축척 컨트롤의 표시 여부
      tileDuration: 100, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
      zoom: 16, // 지도의 초기 줌 레벨
      zoomControl: false, // 줌 컨트롤 표시
    };

    const map = new naver.maps.Map(mapRef.current, mapOptions);

    naver.maps.Event.addListener(map, "bounds_changed", function () {
      loca.latitude = map.getCenter().y;
      loca.longitude = map.getCenter().x;
    });

    loca.latitude = lat;
    loca.longitude = lng;

    const nextdong = new naver.maps.LatLng(loca.latitude, loca.longitude);
    map.panTo(nextdong);
  }, [lat, lng]);

  return <div id="map" ref={mapRef} className={className} />;
}

export default Map;
