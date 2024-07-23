import styles from "../styles/SingInput.module.css";

function SignInput({ type, content, value, name, placeholder }) {
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
      ></input>
    </>
  );
}

export default SignInput;
