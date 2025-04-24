function HouseworkSelect({ value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      <option value="Vacuum Floor">Vacuum Floor</option>
      <option value="Hang Up Clothes">Hang Up Clothes</option>
      <option value="Folding Clothes">Folding Clothes</option>
      <option value="Cook">Cook</option>
      <option value="Clean Bathroom">Clean Bathroom</option>
      <option value="Clean Kitchen">Clean Kitchen</option>
      <option value="Water Plants">Water Plants</option>
      <option value="Take Out Trash">Take Out Trash</option>
      <option value="Make The Bed">Make The Bed</option>
    </select>
  );
}
export default HouseworkSelect;