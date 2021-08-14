import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import TableRows from "components/ui/table";
import { designSiteConfig } from "components/ui/table/design/siteConfig";
import { useState } from "react";
import { getConfigs } from "services/siteConfig";

export default function Config() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = getConfigs({ offset: pageIndex });

  if (error || (data && data.error))
    return (
      <div className="bg-red-100 text-red-800 rounded-xl w-full flex items-center justify-center">
        failed to load
      </div>
    );

  return (
    <Layout>
      <TableRows
        getPageIndex={(item) => setPageIndex(item + 1)}
        initialPage={pageIndex - 1}
        patterns={designSiteConfig}
        data={data}
        disablePagination
        loading={!data && !error}
      />
    </Layout>
  );
}
