function Signtitle({ title }) {
  return (
    <>
      <button className="sign-back">{"<"}</button>
      <span className="sign-title">{title}</span>
    </>
  );
}

export default Signtitle;
