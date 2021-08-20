import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import { Fragment, useEffect, useState } from "react";
import CustomModal from "components/ui/modal";
import StatsTitle from "components/ui/content/stats_title";
import ItemAction from "components/ui/content/item_action";
import StatsCard from "components/ui/content/stats_card";
import SiteCard from "components/ui/SiteCard";
import TableArea from "components/ui/TableArea";
import AddWebsite from "components/ui/forms/AddWebsite";

import { getWebsites } from "lib/website";
import NotFoundData from "components/ui/NotFoundData";

export default function Websites({ websites }) {
  const [activeModal, setActiveModal] = useState(false);
  const [search, setSearch] = useState("");
  const [websiteList, setWebsiteLists] = useState(websites);
  const [pageIndex, setPageIndex] = useState(1);

  const toggleModal = () => setActiveModal(!activeModal);

  const handleRemoveWebsite = (index) => {
    setWebsiteLists((prevState) => {
      prevState.splice(index, 1);
      return [...prevState];
    });
  };

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
          placeholder="Site ara"
          className="focus:outline-none bg-transparent text-lg placeholder-[#657da2] w-full"
        />
        <button
          onClick={toggleModal}
          className="whitespace-nowrap text-gray-700 bg-white border border-[#dbe9fa] px-5 py-2 rounded-md text-[13px] font-semibold"
        >
          Site Ekle
        </button>
      </Flexible>

      {websiteList.length === 0 ? (
        <NotFoundData title="Site bulunamadı" />
      ) : (
        <TableArea>
          {websiteList.map((item, index) => (
            <SiteCard
              deletedItem={(index) => handleRemoveWebsite(index)}
              key={index}
              itemIndex={index}
              website={item.website}
            />
          ))}
        </TableArea>
      )}

      <CustomModal
        setModal={toggleModal}
        headerTitle="Blog Ekle"
        activeModal={activeModal}
        moldalComponent={AddWebsite}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const websites = getWebsites();

  return {
    props: {
      websites,
    },
  };
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
}
