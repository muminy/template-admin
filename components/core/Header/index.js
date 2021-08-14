import Flexible from "components/ui/Flex";
import Searchbar from "./Searchbar";
import UserAction from "./UserAction";
import { HamburgerMenu } from "components/icons/MenuIcon";
import { useState } from "react";
import classNames from "classnames";

export default function HeaderComponent() {
  const [activeMenu, setActiveMenu] = useState(false);

  const handleOpenMenu = () => {
    const sidebarMenu = document.getElementById("sidebar-menu");

    if (activeMenu) {
      sidebarMenu.classList.remove("responsive-sidebar-menu");
      setActiveMenu(false);
      return;
    }

    sidebarMenu.classList.add("responsive-sidebar-menu");
    setActiveMenu(true);
  };

  return (
    <Flexible className="w-full justify-between xl:justify-start lg:justify-start h-[60px] px-8 py-3 bg-white items-center z-10">
      <Flexible className="items-center">
        <button
          onClick={handleOpenMenu}
          className={classNames("block border border-white xl:hidden lg:hidden rounded-md mr-2", {
            "border border-[#e8f2fd]": activeMenu,
          })}
        >
          <HamburgerMenu size="20" />
        </button>
        <div className="font-semibold">LogoText</div>
      </Flexible>
      <Searchbar />
      <UserAction />
    </Flexible>
  );
}
