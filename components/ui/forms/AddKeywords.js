import CustomInput from "../form-elements/input";

import dynamic from "next/dynamic";
import { GridCol, GridSpan } from "../GridArea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingComponent from "../form-elements/loading";
import Flexible from "../Flex";
import { CancelLinesIcon } from "components/icons/Cancel";
import { handleCreateOperations } from "services/operations";
import { connect } from "react-redux";
import { handleGetWebsite } from "services/website";

function AddKeyword({ editable, userToken }) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [websites, setWebsites] = useState([""]);
  const [webList, setWebList] = useState([]);

  const { handleSubmit, register } = useForm();

  const handleGetWebsites = async () => {
    const list = await handleGetWebsite();
    setWebList(list.data);
  };

  const handleStaff = async (formData) => {
    setLoading(true);

    const _websites = [...websites, ...formData.websitelist];

    try {
      const payload = {
        ...formData,
        blacklist: _websites.filter((item) => item).join(","),
        max_browser: 1,
      };

      const createOperation = await handleCreateOperations(userToken, payload);

      if (createOperation.code === 200) {
        setSuccessMessage(true);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("Hata oluştu");

      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);

      setLoading(false);
    }
  };

  const handleAddNewWebsite = () => setWebsites(websites.concat([""]));
  const handleSetWebsiteValue = (index, value) =>
    setWebsites((prevState) => {
      prevState[index] = value;
      return [...prevState];
    });
  const handleRemoveWebsite = (index) =>
    setWebsites((prevState) => {
      prevState.splice(index, 1);
      return [...prevState];
    });

  useEffect(() => {
    handleGetWebsites();
  }, []);

  return (
    <form onSubmit={handleSubmit(handleStaff)} className="px-10 pb-10">
      {loading && <LoadingComponent success={successMessage} editable={editable !== undefined} />}

      {errorMessage && <div className="font-semibold text-red-500 mb-3">{errorMessage}</div>}
      <GridCol cols="grid-cols-12" className="gap-5">
        <GridSpan span="col-span-12">
          <div className="font-semibold mb-2">Anahtar Kelime</div>
          <input
            {...register("keyword", { required: true })}
            className="border border-[#dbe9fa] focus:outline-none bg-blue-50 bg-opacity-30 focus:bg-white w-full rounded-md px-4 py-3"
            placeholder="Anahtar kelime"
          />
        </GridSpan>
        <GridSpan span="col-span-12">
          <div className="font-semibold mb-2">Hariç tutulacak siteler</div>
          {websites.map((item, index) => (
            <Flexible key={index} className="items-center">
              <input
                className="border border-[#dbe9fa] mb-1 bg-blue-50 bg-opacity-30  focus:bg-white focus:outline-none w-full rounded-md px-3 py-2"
                value={item}
                onChange={(text) => handleSetWebsiteValue(index, text.target.value)}
                placeholder="Website Giriniz.."
              />
              <button type="button" onClick={() => handleRemoveWebsite(index)} className="px-3">
                <CancelLinesIcon />
              </button>
            </Flexible>
          ))}
          <GridCol cols="grid-cols-12" className="gap-5 py-4">
            {webList.map((item, index) => (
              <label
                key={index}
                htmlFor={item.website}
                className="flex col-span-2 items-center mb-2"
              >
                <input
                  id={item.website}
                  {...register("websitelist")}
                  type="checkbox"
                  defaultValue={item.website}
                />
                <div className="font-semibold text-sm ml-2">{item.website}</div>
              </label>
            ))}
          </GridCol>
          <button
            onClick={handleAddNewWebsite}
            type="button"
            className="w-full mt-4 py-3 font-semibold text-blue-400 border-r-2 border-b-2 border border-[#dbe9fa] rounded-md bg-blue-50 bg-opacity-30  "
          >
            Yeni Ekle
          </button>
        </GridSpan>
        <GridSpan span="col-span-12">
          <button
            className="px-7 py-3 bg-gray-900 hover:bg-opacity-90 text-white rounded-md"
            type="submit"
          >
            {editable
              ? loading
                ? "Güncelleniyor"
                : "Güncelle"
              : loading
              ? "Anahtar Kelime Ekleniyor"
              : "Anahtar Kelime Ekle"}
          </button>
        </GridSpan>
      </GridCol>
    </form>
  );
}

const statements = (state) => {
  return { userToken: state.userReducer.token };
};

export default connect(statements)(AddKeyword);
