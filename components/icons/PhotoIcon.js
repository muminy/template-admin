export default function PhotoIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512">
      <title>Images</title>
      <path
        d="M432 112V96a48.14 48.14 0 00-48-48H64a48.14 48.14 0 00-48 48v256a48.14 48.14 0 0048 48h16"
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <rect
        x="96"
        y="128"
        width="400"
        height="336"
        rx="45.99"
        ry="45.99"
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <ellipse
        cx="372.92"
        cy="219.64"
        rx="30.77"
        ry="30.55"
        fill="none"
        strokeMiterlimit="10"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M342.15 372.17L255 285.78a30.93 30.93 0 00-42.18-1.21L96 387.64M265.23 464l118.59-117.73a31 31 0 0141.46-1.87L496 402.91"
        fill="none"
        strokeLinecap="round"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
}