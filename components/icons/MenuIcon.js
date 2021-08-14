export default function MenuIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512">
      <title>Ellipsis Vertical</title>
      <circle fill={color} cx="256" cy="256" r="48" />
      <circle fill={color} cx="256" cy="416" r="48" />
      <circle fill={color} cx="256" cy="96" r="48" />
    </svg>
  );
}

export function HamburgerMenu({ size = 24, color = "currentColor" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512">
      <title>Menu</title>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M80 160h352M80 256h352M80 352h352"
      />
    </svg>
  );
}
