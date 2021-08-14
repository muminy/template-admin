import { appointments } from "@db/appointments";
import { services } from "@db/services";
import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import AddBlog from "components/ui/forms/addBlog";
import CustomModal from "components/ui/modal";
import TableRows from "components/ui/table";
import { designAppointments } from "components/ui/table/design/appointments";
import { designBlog } from "components/ui/table/design/blog";
import { designServices } from "components/ui/table/design/services";
import { useState } from "react";
import { getBlogs } from "services/blog";

export default function Blog() {
  const [activeModal, setActiveModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState("");

  const toggleModal = () => setActiveModal(!activeModal);

  return (
    <Layout>
      <Flexible className="items-center mb-4 justify-between">
        <input
          defaultValue={search}
          onChange={(text) => setSearch(text.target.value)}
          placeholder="Blog ara"
          className="focus:outline-none bg-transparent pl-4 text-lg placeholder-[#657da2] w-full"
        />
        <button
          onClick={toggleModal}
          className="whitespace-nowrap text-gray-700 bg-white border px-5 py-2 rounded-md text-[13px] font-semibold"
        >
          Blog Ekle
        </button>
      </Flexible>
      <TableRows
        getPageIndex={(item) => setPageIndex(item + 1)}
        data={appointments}
        initialPage={pageIndex - 1}
        count={appointments.length}
        patterns={designAppointments}
      />
      <CustomModal
        setModal={toggleModal}
        headerTitle="Blog Ekle"
        activeModal={activeModal}
        moldalComponent={AddBlog}
      />
    </Layout>
  );
}
