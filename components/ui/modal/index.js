import { memo, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import CancelIcon from "components/icons/Cancel";
import Flexible from "../Flex";

export default memo(function CustomModal({
  size,
  activeModal,
  moldalComponent,
  setModal,
  editable,
}) {
  const Component = moldalComponent;

  if (!activeModal || !Component) {
    return null;
  }

  return (
    <div className={classNames(style.modal)}>
      <div className={classNames(style.modal_content, size)}>
        <Flexible className="justify-end items-center pb-4 mb-10">
          <button onClick={setModal}>
            <CancelIcon />
          </button>
        </Flexible>
        <Component editable={editable} toggleModal={setModal} />
      </div>
    </div>
  );
});
