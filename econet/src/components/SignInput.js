import styles from "../styles/SingInput.module.css";

function SignInput({ type, content, value, name, placeholder, onChange }) {
  return (
    <>
      <label htmlFor={name} className={styles.sign_label}>
        {content}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        required
        onChange={onChange} // onChange 핸들러 추가
      ></input>
    </>
  );
}

export default SignInput;
