function Select({ className }) {
  return (
    <select id="dong" name="dong" className={className}>
      <option value="Gongdeok">공덕동</option>
      <option value="Ahyeon">아현동</option>
      <option value="Dohwa">도화동</option>
      <option value="Yonggang">용강동</option>
    </select>
  );
}

export default Select;
