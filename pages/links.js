import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import { Fragment, useState } from "react";
import StatsTitle from "components/ui/content/stats_title";
import ItemAction from "components/ui/content/item_action";
import StatsCard from "components/ui/content/stats_card";
import LinkCard from "components/ui/LinkCard";
import TableArea from "components/ui/TableArea";
export default function Links() {
  const [activeModal, setActiveModal] = useState(false);
  const [search, setSearch] = useState("");

  const [pageIndex, setPageIndex] = useState(1);

  const toggleModal = () => setActiveModal(!activeModal);
  console.log(process.env.NODE_ENV);
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
      </Flexible>

      <TableArea>
        <LinkCard totals={141} link="estetic.com.tr" keyword="Yasaklı kelime" />
        <LinkCard totals={24} link="epiyes.com.tr" isActive keyword="Robotx Ücretisz" />
      </TableArea>
    </Layout>
  );
}
