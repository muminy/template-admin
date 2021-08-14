import classNames from "classnames";
import MenuIcon from "components/icons/MenuIcon";
import Pagination from "./pagination";
import style from "./style.module.css";
//
export default function TableRows({
  patterns,
  count,
  data,
  getPageIndex,
  initialPage,
  loading,
  disablePagination,
}) {
  return (
    <div className="rounded-[10px] w-full">
      <div className="bg-white overflow-design p-2 mb-4 rounded-md overflow-x-auto">
        <table className="min-w-full mr-2 border-space">
          <thead className="border-b-8 border-white">
            <tr>
              {patterns.map((item, index) => (
                <td
                  key={index}
                  style={{ minWidth: item.minWidth }}
                  className="pl-4 first:pl-2 whitespace-nowrap py-2 bg-yellow-50 first:rounded-tl-md first:rounded-bl-xl last:rounded-tr-md last:rounded-br-xl"
                >
                  {item.placeholder}
                </td>
              ))}
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {data.map((item_rows, index) => (
                <tr
                  key={index}
                  className="bg-[#f3f8ff] last:border-b-0 border-b-4  border-white border-space"
                >
                  {patterns.map((item, index) => (
                    <td
                      key={index}
                      style={{ minWidth: item.minWidth, maxHeight: 40, maxWidth: item.maxWidth }}
                      className={classNames(
                        "font-semibold first:pl-2 truncate  whitespace-nowrap first:rounded-tl-xl first:rounded-bl-xl px-4 col-auto text-[13px] text-gray-700 py-2"
                      )}
                    >
                      {item.cell ? item.cell(item_rows) : item_rows[item.row]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && <div className="bg-[#f3f8ff] py-4 w-full text-center">Data yükleniyor</div>}
        {!loading && data.length === 0 && (
          <div className="bg-[#f3f8ff] py-4 w-full text-center">Data Yok</div>
        )}
      </div>
      {!loading && !disablePagination && (
        <Pagination initialPage={initialPage} getPageIndex={getPageIndex} size={count / 10} />
      )}
    </div>
  );
}
