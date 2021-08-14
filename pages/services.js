import { services } from "@db/services";
import Layout from "components/core/layout";
import ItemAction from "components/ui/content/item_action";
import StatsCard from "components/ui/content/stats_card";
import StatsTitle from "components/ui/content/stats_title";
import Flexible from "components/ui/Flex";
import AddServices from "components/ui/forms/addServices";
import CustomModal from "components/ui/modal";
import TableRows from "components/ui/table";
import { designServices } from "components/ui/table/design/services";
import { Fragment, useState } from "react";
import { getServices } from "services/services";

export default function Services() {
  const [activeModal, setActiveModal] = useState(false);
  const [search, setSearch] = useState("");

  const toggleModal = () => setActiveModal(!activeModal);

  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = getServices({ offset: pageIndex, search });

  if (error || (data && data.error))
    return (
      <div className="bg-red-100 text-red-800 rounded-xl w-full flex items-center justify-center">
        failed to load
      </div>
    );

  return (
    <Layout
      rightSidebar={() => (
        <Fragment>
          <StatsTitle title="Son işlemler" />
          <ItemAction title="Randevu düzenlendi" type="warning" />
          <ItemAction title="Randevu silindi" type="danger" />
          <ItemAction title="Randevu oluşturuldu" type="success" />
          <StatsTitle className="mt-10" title="Genel İstatistikler" />
          <StatsCard title="Toplam Hizmet" stats={data?.count} />
        </Fragment>
      )}
    >
      <Flexible className="items-center mb-4 justify-between">
        <input
          defaultValue={search}
          onChange={(text) => setSearch(text.target.value)}
          placeholder="Servis ara"
          className="focus:outline-none bg-transparent pl-4 text-lg placeholder-[#657da2] w-full"
        />
        <button
          onClick={toggleModal}
          className="whitespace-nowrap text-gray-700 bg-white border px-5 py-2 rounded-md text-[13px] font-semibold"
        >
          Servis Ekle
        </button>
      </Flexible>
      <TableRows
        getPageIndex={(item) => setPageIndex(item + 1)}
        initialPage={pageIndex - 1}
        patterns={designServices}
        data={data}
        loading={!data && !error}
      />
      <CustomModal setModal={toggleModal} activeModal={activeModal} moldalComponent={AddServices} />
    </Layout>
  );
}
