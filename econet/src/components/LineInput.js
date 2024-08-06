function LineInput({
  type,
  content,
  value,
  name,
  onChange,
  required,
  className,
}) {
  return (
    <div className={className}>
      <label htmlFor={name}>
        {content}
        {required ? <span>*</span> : null}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        required={required}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default LineInput;
