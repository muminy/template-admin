import classNames from "classnames";

export default function ItemAction({ type = "success", title }) {
  return (
    <div
      className={classNames(
        "notify-card rounded-md mb-2 p-4 text-black text-opacity-75 font-semibold relative",
        {
          "bg-green-50": type === "success",
          "bg-yellow-50": type === "warning",
          "bg-red-50": type === "danger",
        }
      )}
    >
      {title}
    </div>
  );
}
