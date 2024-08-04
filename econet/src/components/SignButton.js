import React from "react";
import styles from "../styles/SignButton.module.css";

function SignButton({ title, disabled }) {
  return (
    <button
      className={`${styles.sign_button} ${
        disabled ? styles.disabled : styles.active
      }`}
      type="submit"
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default SignButton;
