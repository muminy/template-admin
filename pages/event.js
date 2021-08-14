import { services } from "@db/services";
import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import TableRows from "components/ui/table";
import { Fragment, useState } from "react";
import CustomModal from "components/ui/modal";
import AddEvent from "components/ui/forms/addEvent";
import { designEvent } from "components/ui/table/design/event";
import { getEvents } from "services/event";
import StatsTitle from "components/ui/content/stats_title";
import ItemAction from "components/ui/content/item_action";
import StatsCard from "components/ui/content/stats_card";

export default function Events() {
  const [activeModal, setActiveModal] = useState(false);
  const toggleModal = () => setActiveModal(!activeModal);
  const [search, setSearch] = useState("");

  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = getEvents({ offset: pageIndex, search });

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
          <StatsCard title="Toplam Etkinlik" stats={data?.count} />
          <StatsCard title="Bugün Toplam Etkinlik" stats={data?.today} />
          <StatsCard title="Devam Eden Etkinlik" stats={data?.continuing} />
        </Fragment>
      )}
    >
      <Flexible className="items-center mb-4 justify-between">
        <input
          defaultValue={search}
          onChange={(text) => setSearch(text.target.value)}
          placeholder="Etkinlik ara"
          className="focus:outline-none bg-transparent pl-4 text-lg placeholder-[#657da2] w-full"
        />
        <button
          onClick={toggleModal}
          className="whitespace-nowrap text-gray-700 bg-white border px-5 py-2 rounded-md text-[13px] font-semibold"
        >
          Etkinlik Ekle
        </button>
      </Flexible>
      <TableRows
        getPageIndex={(item) => setPageIndex(item + 1)}
        initialPage={pageIndex - 1}
        patterns={designEvent}
        data={data}
        loading={!data && !error}
      />
      <CustomModal
        setModal={toggleModal}
        headerTitle="Blog Ekle"
        activeModal={activeModal}
        moldalComponent={AddEvent}
      />
    </Layout>
  );
}
