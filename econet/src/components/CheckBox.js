function CheckBox({ name, value, title, className }) {
  return (
    <div className={className}>
      <input type="checkbox" name={name} value={value} id={value} />
      <label htmlFor={value}>{title}</label>
    </div>
  );
}

export default CheckBox;
