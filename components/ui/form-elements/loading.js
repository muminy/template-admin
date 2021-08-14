import classNames from "classnames";

export default function LoadingComponent({ success, editable }) {
  return (
    <div className="absolute left-0 top-0 h-full w-full bg-white bg-opacity-60 z-10 flex items-center justify-center">
      <div
        className={classNames("font-semibold text-sm px-5 py-3 bg-gray-200 rounded-md", {
          "!bg-green-200": success,
        })}
      >
        {success
          ? editable
            ? "Güncellendi"
            : "Kayıt edildi"
          : editable
          ? "Güncelleniyor"
          : "Kayıt ediliyor"}
      </div>
    </div>
  );
}
