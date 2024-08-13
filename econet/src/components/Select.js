import { useEffect, useState } from "react";
import { getDistricts } from "../api/districts";

function Select({ onChange, className }) {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const { mapo_districts } = await getDistricts();
    setItems(mapo_districts);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <select name="dong" onChange={onChange} className={className}>
      {items.map((item) => {
        const latlng = `${item.latitude},${item.longitude}`;
        return (
          <option value={latlng} key={item.id}>
            {item.district}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
