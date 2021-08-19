import style from "./index.module.css";
import ReactPaginate from "react-paginate";

export default function Pagination({ pageSize = 40 }) {
  return (
    <div className={style.pagination}>
      <ReactPaginate
        previousLabel={"Önceki"}
        nextLabel={"Sonraki"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageSize}
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        onPageChange={(e) => console.log(e)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
