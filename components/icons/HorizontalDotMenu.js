export default function HorizontalDotMenu({
  size = 24,
  color = "currentColor",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
    >
      <title>Ellipsis Horizontal</title>
      <circle cx="256" cy="256" r="48" />
      <circle cx="416" cy="256" r="48" />
      <circle cx="96" cy="256" r="48" />
    </svg>
  );
}
