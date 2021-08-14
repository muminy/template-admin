import classNames from "classnames";

export default function CustomInput({
  className = "",
  placeholder = "",
  tag: Component = "input",
  label,
  name,
  innerRef,
  defaultValue = "",
  onChangeText,
  type = "text",
}) {
  return (
    <div className="pt-2 relative">
      {label && <div className="font-bold mb-2">{label}</div>}
      <Component
        {...innerRef}
        name={name}
        type={type}
        onChange={onChangeText}
        defaultValue={defaultValue}
        className={classNames("custom-input", className)}
        placeholder={placeholder}
      />
    </div>
  );
}
