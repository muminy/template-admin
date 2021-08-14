export function Select({ register, options, name, ...rest }) {
  return (
    <select {...register(name, { required: true })} {...rest}>
      {options.map((value) => (
        <option value={value.id}>{value}</option>
      ))}
    </select>
  );
}
