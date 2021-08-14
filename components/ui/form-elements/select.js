export function Select({ register, options, name, ...rest }) {
  return (
    <select className="custom-input">
      {options.map((value) => (
        <option value={value.id}>{value.value}</option>
      ))}
    </select>
  );
}
