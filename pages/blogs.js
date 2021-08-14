import { services } from "@db/services";
import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import AddBlog from "components/ui/forms/addBlog";
import CustomModal from "components/ui/modal";
import TableRows from "components/ui/table";
import { designBlog } from "components/ui/table/design/blog";
import { designServices } from "components/ui/table/design/services";
import { useState } from "react";
import { getBlogs } from "services/blog";

export default function Blog() {
  const [activeModal, setActiveModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState("");

  const { data, error } = getBlogs({ offset: pageIndex, search });

  const toggleModal = () => setActiveModal(!activeModal);

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
        data={data}
        initialPage={pageIndex - 1}
        patterns={designBlog}
        loading={!data && !error}
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
