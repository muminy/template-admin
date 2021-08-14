import { Fragment, memo, useState } from "react";
import Flexible from "../Flex";
import style from "./style.module.css";
import classNames from "classnames";
import ReactPaginate from "react-paginate";

export default function Pagination({ size, getPageIndex, initialPage = 0 }) {
  return (
    <Flexible className="items-center justify-center ">
      <div>
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={size}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          initialPage={initialPage}
          onPageChange={(item) => getPageIndex(item.selected)}
          containerClassName={"pagination inline-flex p-1 bg-white rounded-md"}
          pageClassName={classNames("rounded-md mr-1")}
          breakLinkClassName="w-[30px] h-[30px] rounded-md flex hover:bg-gray-200 items-center justify-center"
          pageLinkClassName="w-[30px] h-[30px] rounded-md flex hover:bg-gray-200 items-center justify-center"
          activeClassName={"bg-gray-200"}
        />
      </div>
    </Flexible>
  );
}
