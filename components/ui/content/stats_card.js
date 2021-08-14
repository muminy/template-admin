import classNames from "classnames";

export default function StatsCard({ stats, title }) {
  return (
    <div className={classNames("stats-card last:mb-0 mb-2 p-4 font-medium relative")}>
      <div className="text-lg font-black text-gray-900">{stats}</div>
      <div className="font-medium text-sm text-gray-700 opacity-75">{title}</div>
    </div>
  );
}
