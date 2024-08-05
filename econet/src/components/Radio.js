function Radio({ name, value, title, onChange, className, checked }) {
  return (
    <div className={className}>
      <input
        type="radio"
        name={name}
        value={value}
        id={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={value}>{title}</label>
    </div>
  );
}

export default Radio;
