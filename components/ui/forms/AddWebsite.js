import { GridCol, GridSpan } from "../GridArea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingComponent from "../form-elements/loading";
import { connect } from "react-redux";
import { handleAddWebsite } from "services/website";

function AddWebsite({ editable }) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { handleSubmit, register } = useForm();

  const handleStaff = async (formData) => {
    setLoading(true);
    const addwebsite = await handleAddWebsite(formData);

    if (addwebsite.code && addwebsite.code === 200) {
      setSuccessMessage(true);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setErrorMessage("Hata oluştu");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleStaff)} className="px-10 pb-10">
      {loading && <LoadingComponent success={successMessage} editable={editable !== undefined} />}
      {errorMessage && <div className="font-semibold text-red-500 mb-3">{errorMessage}</div>}

      <GridCol cols="grid-cols-12" className="gap-5">
        <GridSpan span="col-span-12">
          <div className="font-semibold mb-2">Website Adresi</div>
          <input
            {...register("website", { required: true })}
            className="border border-[#dbe9fa] focus:outline-none bg-blue-50 bg-opacity-30 focus:bg-white w-full rounded-md px-4 py-3"
            placeholder="estetic.com.tr.."
          />
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
              ? "Ekleniyor"
              : "Website Ekle"}
          </button>
        </GridSpan>
      </GridCol>
    </form>
  );
}

const statements = (state) => {
  return { userToken: state.userReducer.token };
};

export default connect(statements)(AddWebsite);
