import { useEffect, useState } from "react";
import { getDistricts } from "../api/districts";

// function Select({ onChange, className }) {
//   const [items, setItems] = useState([]);

//   const handleLoad = async () => {
//     const { mapo_districts } = await getDistricts();
//     setItems(mapo_districts);
//   };

//   useEffect(() => {
//     handleLoad();
//   }, []);

//   return (
//     <select name="dong" onChange={onChange} className={className}>
//       {items.map((item) => {
//         const latlng = `${item.latitude},${item.longitude}`;
//         return (
//           <option value={latlng} key={item.id}>
//             {item.district}
//           </option>
//         );
//       })}
//     </select>
//   );
// }

function Select({ onChange, className }) {
  const [items, setItems] = useState([]); // 초기값을 빈 배열로 설정합니다.

  const handleLoad = async () => {
    try {
      const data = await getDistricts();
      // data에서 mapo_districts 필드를 안전하게 추출합니다.
      const districts = data?.mapo_districts || [];
      setItems(districts);
    } catch (error) {
      console.error("Failed to fetch districts:", error);
      // 에러가 발생해도 items는 빈 배열로 설정하여 렌더링 문제를 방지합니다.
      setItems([]);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  // items가 비어 있을 때 기본 옵션을 표시합니다.
  return (
    <select name="dong" onChange={onChange} className={className}>
      {items.length > 0 ? (
        items.map((item) => {
          const latlng = `${item.latitude},${item.longitude}`;
          return (
            <option value={latlng} key={item.id}>
              {item.district}
            </option>
          );
        })
      ) : (
        <option value="">Loading...</option>
      )}
    </select>
  );
}

export default Select;
