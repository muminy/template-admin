import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import TableRows from "components/ui/table";
import { designAppointments } from "components/ui/table/design/appointments";
import { Fragment, useState } from "react";
import { getAppointments } from "services/appointments";
import StatsTitle from "components/ui/content/stats_title";
import ItemAction from "components/ui/content/item_action";
import StatsCard from "components/ui/content/stats_card";

export default function Appointments() {
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState("");

  const { data, error } = getAppointments({ offset: pageIndex, search });

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
          <StatsCard title="Bugün Toplam Randevu" stats={data?.today} />
          <StatsCard title="Toplam Randevu" stats={data?.count} />
        </Fragment>
      )}
    >
      <Flexible className="items-center mb-4">
        <input
          defaultValue={search}
          onChange={(text) => setSearch(text.target.value)}
          placeholder="Randevu ara"
          className="focus:outline-none bg-transparent pl-4 text-lg placeholder-[#657da2] w-full"
        />
      </Flexible>
      <TableRows
        getPageIndex={(item) => setPageIndex(item + 1)}
        data={data}
        initialPage={pageIndex - 1}
        loading={!data && !error}
        patterns={designAppointments}
      />
    </Layout>
  );
}
