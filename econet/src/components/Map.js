import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getBins } from "../api/bins";
import zIndex from "@mui/material/styles/zIndex";

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
  });
  const { data: batterybulb } = useQuery({
    queryKey: ["bin", "폐건전지, 폐형광등 수거함"],
    queryFn: ({ queryKey }) => getBins(queryKey[1]),
  });
  const { data: medicine } = useQuery({
    queryKey: ["bin", "폐의약품"],
    queryFn: ({ queryKey }) => getBins(queryKey[1]),
  });
  const { data: cigarette } = useQuery({
    queryKey: ["bin", "담배꽁초"],
    queryFn: ({ queryKey }) => getBins(queryKey[1]),
  });

  const bindata = {
    의류수거함: clothes,
    "폐건전지, 폐형광등 수거함": batterybulb,
    폐의약품: medicine,
    담배꽁초: cigarette,
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

    async function addressToCoord(address) {
      let point = [];
      await naver.maps.Service.geocode(
        {
          query: address,
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert("Something Wrong!");
          }

          if (response.v2.meta.totalCount === 0) {
            return alert("totalCount" + response.v2.meta.totalCount);
          }

          const item = response.v2.addresses[0];
          point = [Number(item.y), Number(item.x)];
          console.log(point);
          console.log("p");
        }
      );
      return point;
    }

    const markers = [];

    // const [x, y] = addressToCoord("서울특별시 마포구 대흥로 40");
    // console.log(addressToCoord("서울특별시 마포구 대흥로 40"));
    // console.log("마");
    // console.log(x);
    // console.log("x");
    const marker = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(37.557685477130704, 126.960530155717),
      zIndex: 999,
    });

    // for (let i of bin) {
    //   for (let j of bindata[i]) {
    //     const [la, lo] = addressToCoord(j.location);

    //     const marker = new naver.maps.Marker({
    //       map: map,
    //       position: new naver.maps.LatLng(la, lo),
    //     });
    //     console.log(la);
    //     console.log(lo);
    //     markers.push(marker);
    //   }
    // }
    //console.log(markers);

    const nextdong = new naver.maps.LatLng(lat, lng);
    map.panTo(nextdong);
  }, [lat, lng, bin]);

  return <div id="map" ref={mapRef} className={className} />;
}

export default Map;
