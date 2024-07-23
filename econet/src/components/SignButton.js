import React from "react";
import styles from "../styles/SignButton.module.css";

function SignButton({ title }) {
  return (
    <button className={styles.sign_button} type="submit">
      {title}
    </button>
  );
}

export default SignButton;
