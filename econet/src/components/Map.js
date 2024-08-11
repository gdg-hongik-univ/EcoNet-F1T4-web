import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getBins } from "../api/bins";
import batteryimg from "../assets/battery.svg";
import clothesimg from "../assets/clothes.svg";
import pillimg from "../assets/pill.svg";
import cigaretteimg from "../assets/cigarette.svg";

const { naver } = window;

const loca = {
  latitude: 37.54932,
  longitude: 126.9579,
};

function Map({ lat, lng, bin, className }) {
  const mapRef = useRef(null);

  const { data: clothes } = useQuery({
    queryKey: ["bin", "의류수거함"],
    queryFn: ({ queryKey }) => getBins(queryKey[1]),
    staleTime: 60 * 1000 * 10,
    gcTime: 60 * 1000 * 10,
    keepPreviousData: true,
  });
  const { data: batterybulb } = useQuery({
    queryKey: ["bin", "폐건전지, 폐형광등 수거함"],
    queryFn: ({ queryKey }) => getBins(queryKey[1]),
    staleTime: 60 * 1000 * 10,
    gcTime: 60 * 1000 * 10,
  });
  const { data: medicine } = useQuery({
    queryKey: ["bin", "폐의약품"],
    queryFn: ({ queryKey }) => getBins(queryKey[1]),
    staleTime: 60 * 1000 * 10,
    gcTime: 60 * 1000 * 10,
  });
  const { data: cigarette } = useQuery({
    queryKey: ["bin", "담배꽁초"],
    queryFn: ({ queryKey }) => getBins(queryKey[1]),
    staleTime: 60 * 1000 * 10,
    gcTime: 60 * 1000 * 10,
  });

  const bindata = {
    의류수거함: clothes,
    "폐건전지, 폐형광등 수거함": batterybulb,
    폐의약품: medicine,
    담배꽁초: cigarette,
  };

  const images = {
    의류수거함: clothesimg,
    "폐건전지, 폐형광등 수거함": batteryimg,
    폐의약품: pillimg,
    담배꽁초: cigaretteimg,
  };

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

    const markers = [];
    const infoWindows = [];

    for (let i of bin) {
      for (let j of bindata[i]) {
        const marker = new naver.maps.Marker({
          map: map,
          position: new naver.maps.LatLng(j.address[0], j.address[1]),
          icon: {
            url: `${images[j.category]}`,
            size: new naver.maps.Size(35, 35),
            scaledSize: new naver.maps.Size(35, 35),
          },
        });

        markers.push(marker);

        const infoWindow = new naver.maps.InfoWindow({
          content: [
            `<div style="padding: 10px; box-shadow: rgba(0,0,0,0.1) 2px 4px 8px 3px;">`,
            ` <div style="font-weight: bold; margin-bottom: 5px;">${j.category}</div>`,
            ` <div style="font-size: 11px; margin-bottom: 5px;">${j.location}</div>`,
            ` <div style="font-size: 13px;">수거 대상: ${j.acceptible}</div>`,
            ` <div style="font-size: 13px; margin-bottom: 5px;">수거 불가: ${j.unacceptible}</div>`,
            ` <a style="color:#56D8BC;" href="/bininfo/${j.id}">자세히 알아보기</a>`,
            `</div>`,
          ].join(""),
          anchorSize: {
            width: 13,
            height: 15,
          },
        });

        infoWindows.push(infoWindow);
      }
    }

    const getClickHandler = (i) => {
      return () => {
        if (infoWindows[i].getMap()) {
          infoWindows[i].close();
        } else if (map !== null) {
          infoWindows[i].open(map, markers[i]);
        }
      };
    };

    for (let i = 0; i < markers.length; i++) {
      naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
    }

    const nextdong = new naver.maps.LatLng(lat, lng);
    map.panTo(nextdong);
  }, [lat, lng, bin]);

  return <div id="map" ref={mapRef} className={className} />;
}

export default Map;
