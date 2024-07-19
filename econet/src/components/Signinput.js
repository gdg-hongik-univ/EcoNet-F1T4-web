function Signinput({ type, content, value, name, placeholder }) {
  return (
    <>
      <label htmlFor={name} className="sign-label">
        {content}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
      ></input>
    </>
  );
}

export default Signinput;
