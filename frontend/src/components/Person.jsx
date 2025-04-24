function Person({ value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      <option value="Yixuan">Yixuan</option>
      <option value="Robin">Robin</option>
      <option value="Both">Both</option>
    </select>
  );
}

export default Person;