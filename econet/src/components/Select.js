import { getDistricts } from "../api/districts";

const { mapo_districts } = await getDistricts();

function Select({ onChange, className }) {
  return (
    <select name="dong" onChange={onChange} className={className}>
      mapo_districts &&
      {mapo_districts.map((item) => {
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
