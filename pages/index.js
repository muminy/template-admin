import Layout from "components/core/layout";
import Flexible from "components/ui/Flex";
import { Fragment, useEffect, useState } from "react";
import CustomModal from "components/ui/modal";
import StatsTitle from "components/ui/content/stats_title";
import ItemAction from "components/ui/content/item_action";
import StatsCard from "components/ui/content/stats_card";
import AddKeyword from "components/ui/forms/AddKeywords";
import KeywordCard from "components/ui/KeywordCard";
import TableArea from "components/ui/TableArea";
import Pagination from "components/ui/Pagination";
import { connect } from "react-redux";
import { handleGetOperations } from "services/operations";
import NotFoundData from "components/ui/NotFoundData";

function Keywords({ userToken }) {
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(false);
  const [search, setSearch] = useState("");
  const [operations, setOperations] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);

  const toggleModal = () => setActiveModal(!activeModal);

  const getOperations = async () => {
    const operationLists = await handleGetOperations(userToken);

    if (operationLists && typeof operationLists.message === "object") {
      setOperations(operationLists.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (userToken) {
      getOperations();
    }
  }, [userToken]);

  return (
    <Layout
      rightSidebar={() => (
        <Fragment>
          <StatsTitle title="Genel İstatistikler" />
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
          placeholder="Anahtar kelime ara"
          className="focus:outline-none bg-transparent text-lg placeholder-[#657da2] w-full"
        />
        <button
          onClick={toggleModal}
          className="whitespace-nowrap text-gray-700 bg-white border border-[#dbe9fa] px-5 py-2 rounded-md text-[13px] font-semibold"
        >
          Anahtar Kelime Ekle
        </button>
      </Flexible>

      {loading ? (
        <NotFoundData title="Data Yükleniyor" />
      ) : operations.length === 0 ? (
        <NotFoundData />
      ) : (
        <TableArea>
          {operations.map((item) => (
            <KeywordCard key={item.ID} {...item} />
          ))}
        </TableArea>
      )}

      {!loading && operations.length > 0 && <Pagination />}

      <CustomModal
        setModal={toggleModal}
        headerTitle="Blog Ekle"
        activeModal={activeModal}
        moldalComponent={AddKeyword}
      />
    </Layout>
  );
}

const statements = (state) => {
  return { userToken: state.userReducer.token };
};

export default connect(statements)(Keywords);
