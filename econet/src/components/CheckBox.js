function CheckBox({ name, value, title, className }) {
  return (
    <div className={className}>
      <input type="checkbox" name={name} value={value} id={value} />
      <label for={value}>{title} 수거함</label>
    </div>
  );
}

export default CheckBox;
