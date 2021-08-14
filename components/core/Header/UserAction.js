import style from "./style.module.css";

export default function UserAction() {
  const handleClose = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div>
      <button className={style.user_profile}>
        <span>MY</span>
        <ul tabIndex="1" className={style.action_list}>
          <li onClick={handleClose}>Çıkış yap</li>
        </ul>
      </button>
    </div>
  );
}
