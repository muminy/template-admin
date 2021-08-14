import { services } from "@db/services";
import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import AddBranch from "components/ui/forms/addBranch";
import CustomModal from "components/ui/modal";
import TableRows from "components/ui/table";
import { designBranch } from "components/ui/table/design/branch";
import { useState } from "react";
import { getBranchs } from "services/branch";

export default function Branch() {
  const [activeModal, setActiveModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState("");

  const { data, error } = getBranchs({ offset: pageIndex, search });

  const toggleModal = () => setActiveModal(!activeModal);

  if (error || (data && data.error))
    return (
      <div className="bg-red-100 text-red-800 rounded-xl w-full flex items-center justify-center">
        failed to load
      </div>
    );

  return (
    <Layout>
      <Flexible className="items-center mb-4 justify-between">
        <input
          defaultValue={search}
          onChange={(text) => setSearch(text.target.value)}
          placeholder="Şube ara"
          className="focus:outline-none bg-transparent pl-4 text-lg placeholder-[#657da2] w-full"
        />
        <button
          onClick={toggleModal}
          className="whitespace-nowrap text-gray-700 bg-white border px-5 py-2 rounded-md text-[13px] font-semibold"
        >
          Şube Ekle
        </button>
      </Flexible>
      <TableRows
        getPageIndex={(item) => setPageIndex(item + 1)}
        initialPage={pageIndex - 1}
        patterns={designBranch}
        data={data}
        loading={!data && !error}
      />

      <CustomModal
        moldalComponent={AddBranch}
        setModal={toggleModal}
        headerTitle="Branch Ekle"
        activeModal={activeModal}
      />
    </Layout>
  );
}
