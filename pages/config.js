import { appointments } from "@db/appointments";
import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import TableRows from "components/ui/table";
import { designAppointments } from "components/ui/table/design/appointments";
import { designSiteConfig } from "components/ui/table/design/siteConfig";
import { useState } from "react";
import { getConfigs } from "services/siteConfig";

export default function Config() {
  const [pageIndex, setPageIndex] = useState(1);

  return (
    <Layout>
      <TableRows
        getPageIndex={(item) => setPageIndex(item + 1)}
        initialPage={pageIndex - 1}
        patterns={designAppointments}
        data={appointments}
        count={appointments.length}
        disablePagination
      />
    </Layout>
  );
}
