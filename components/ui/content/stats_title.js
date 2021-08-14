import classNames from "classnames";

export default function StatsTitle({ title, className }) {
  return (
    <div className={classNames("font-semibold text-[15px] text-gray-600 mb-5", className)}>
      {title}
    </div>
  );
}
