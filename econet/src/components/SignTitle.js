import styles from "../styles/SignTitle.module.css";

function SignTitle({ title }) {
  return (
    <>
      <button className={styles.sign_back}>{"<"}</button>
      <span className={styles.sign_title}>{title}</span>
    </>
  );
}

export default SignTitle;
