import classNames from "classnames";
import { routers } from "helpers/routers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./style.module.css";

export default function MenuLists() {
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [routers]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-2 w-full">
      <div className="uppercase text-sm font-bold text-gray-500 tracking-wider mb-2 px-4">MENU</div>
      {routers.map((item) => (
        <Link key={item.href} href={item.href}>
          <a
            className={classNames(
              style.menu_link,
              `hover:to-gray-800 w-full block after:to-gray-100`,
              colorPalette[item.href],
              {
                [style["active-menu"]]: pathname === item.href,
              }
            )}
          >
            {console.log(colorPalette["/events"])}
            <span className={classNames(style.menu_span, colorPaletteBorder[item.href])} />
            <span className="ml-3 font-medium">{item.title}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}

const colorPalette = {
  "/": "hover:from-red-500 after:from-red-500",
  "/links": "hover:from-blue-500 after:from-blue-500",
  "/sites": "hover:from-green-500 after:from-green-500",
  "/users": "hover:from-gray-500 after:from-gray-500",
};

const colorPaletteBorder = {
  "/": "border-red-500",
  "/links": "border-blue-500",
  "/sites": "border-green-500",
  "/users": "border-gray-500",
};
