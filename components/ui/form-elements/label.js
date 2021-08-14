export default function CustomLabel({ label, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="absolute text-gray-600 top-0 left-0 px-2 text-sm font-semibold bg-white ml-2"
    >
      {label}
    </label>
  );
}
