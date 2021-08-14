import MenuIcon from "components/icons/MenuIcon";
import { Fragment, useState } from "react";
import { postFetcher } from "services/swr";
import AddBranch from "../forms/addBranch";
import CustomModal from "../modal";

export default function ActionMenu({ routeName, rows, component, editStatus, disableRemove }) {
  const [activeModal, setActiveModal] = useState(false);
  const toggleModal = () => setActiveModal(!activeModal);

  const handleDeleteItem = async (type = "delete") => {
    const permission = confirm("Silmek istediğine emin misin?");
    const router = `${routeName}/${type}/${rows.id}`;

    const payload = {};

    if (type === "update") {
      payload[editStatus] = rows[editStatus] === 1 ? 0 : 1;
    }

    if (permission) {
      const fetchItem = await postFetcher(router, { ...payload });

      if (fetchItem && !fetchItem.error) {
        window.location.reload();
      }
    }
  };

  return (
    <Fragment>
      <button className="roll-item">
        <MenuIcon size={20} />
        <div tabIndex="1" className="dot-menu-items">
          {component && (
            <div role="button" onClick={toggleModal}>
              Düzenlele
            </div>
          )}
          {editStatus && (
            <div role="button" onClick={() => handleDeleteItem("update")}>
              {rows[editStatus] === 1 ? "İptal et" : "Aktif et"}
            </div>
          )}
          {!disableRemove && (
            <div className="text-red-700" role="button" onClick={() => handleDeleteItem("delete")}>
              Sil
            </div>
          )}
        </div>
      </button>
      <CustomModal
        editable={rows}
        setModal={toggleModal}
        activeModal={activeModal}
        moldalComponent={component}
      />
    </Fragment>
  );
}
