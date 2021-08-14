import { services } from "@db/services";
import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import TableRows from "components/ui/table";
import { designContact } from "components/ui/table/design/contact";
import { useState } from "react";
import { getContacts } from "services/contact";

export default function Contact() {
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState("");
  const { data, error } = getContacts({ offset: pageIndex, search });

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
          placeholder="İletişim ara"
          className="focus:outline-none bg-transparent pl-4 text-lg placeholder-[#657da2] w-full"
        />
      </Flexible>
      <TableRows
        getPageIndex={(item) => setPageIndex(item + 1)}
        initialPage={pageIndex - 1}
        patterns={designContact}
        data={data}
        loading={!data && !error}
      />
    </Layout>
  );
}
