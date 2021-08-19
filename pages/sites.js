import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import { Fragment, useState } from "react";
import CustomModal from "components/ui/modal";
import StatsTitle from "components/ui/content/stats_title";
import ItemAction from "components/ui/content/item_action";
import StatsCard from "components/ui/content/stats_card";
import SiteCard from "components/ui/SiteCard";
import TableArea from "components/ui/TableArea";

export default function Links() {
  const [activeModal, setActiveModal] = useState(false);
  const [search, setSearch] = useState("");

  const [pageIndex, setPageIndex] = useState(1);

  const toggleModal = () => setActiveModal(!activeModal);

  return (
    <Layout
      rightSidebar={() => (
        <Fragment>
          <StatsTitle title="Son işlemler" />
          <ItemAction title="Randevu düzenlendi" type="warning" />
          <ItemAction title="Randevu silindi" type="danger" />
          <ItemAction title="Randevu oluşturuldu" type="success" />
          <StatsTitle className="mt-10" title="Genel İstatistikler" />
          <StatsCard title="Toplam Etkinlik" stats={3} />
          <StatsCard title="Bugün Toplam Etkinlik" stats={5} />
          <StatsCard title="Devam Eden Etkinlik" stats={8} />
        </Fragment>
      )}
    >
      <Flexible className="items-center mb-4 justify-between">
        <input
          defaultValue={search}
          onChange={(text) => setSearch(text.target.value)}
          placeholder="Link ara"
          className="focus:outline-none bg-transparent text-lg placeholder-[#657da2] w-full"
        />
        {/* <button
          onClick={toggleModal}
          className="whitespace-nowrap text-gray-700 bg-white border px-5 py-2 rounded-md text-[13px] font-semibold"
        >
          Link Ekle
        </button> */}
      </Flexible>

      <TableArea>
        <SiteCard website="estetic.com.tr" />
        <SiteCard website="epiyes.com.tr" />
      </TableArea>

      {/* <CustomModal
        setModal={toggleModal}
        headerTitle="Blog Ekle"
        activeModal={activeModal}
        moldalComponent={AddEvent}
      /> */}
    </Layout>
  );
}
