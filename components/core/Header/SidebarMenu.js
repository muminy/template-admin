import MenuLists from "./MenuLists";
import style from "./style.module.css";

export default function SidebarMenu() {
  return (
    <div id="sidebar-menu" className={style.sidebar_menu}>
      <MenuLists />
    </div>
  );
}
