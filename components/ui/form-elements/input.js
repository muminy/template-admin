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
      <Component
        {...innerRef}
        name={name}
        type={type}
        onChange={onChangeText}
        defaultValue={defaultValue}
        className={classNames(className)}
        placeholder={placeholder}
      />
      {label && (
        <div className="absolute text-gray-600 top-0 px-2 text-sm font-semibold bg-white ml-2">
          {label}
        </div>
      )}
    </div>
  );
}
