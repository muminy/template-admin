import { appointments } from "@db/appointments";
import { services } from "@db/services";
import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import TableRows from "components/ui/table";
import { designAppointments } from "components/ui/table/design/appointments";
import { designContact } from "components/ui/table/design/contact";
import { useState } from "react";
import { getContacts } from "services/contact";

export default function Contact() {
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState("");

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
        count={appointments.length}
        data={appointments}
        patterns={designAppointments}
      />
    </Layout>
  );
}
