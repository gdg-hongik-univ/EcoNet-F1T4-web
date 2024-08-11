function CheckBox({ name, value, title, checked, onChange, className }) {
  return (
    <div className={className}>
      <input
        type="checkbox"
        name={name}
        value={value}
        id={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={value}>{title}</label>
    </div>
  );
}

export default CheckBox;
