import { useEffect, useState } from "react";
import { baseURL, postFetcher } from "services/swr";
import CustomInput from "../form-elements/input";
import CustomLabel from "../form-elements/label";
import { useForm } from "react-hook-form";
import { GridCol, GridSpan } from "../GridArea";
import LoadingComponent from "../form-elements/loading";

export default function AddServiceGroups({ editable }) {
  const [branchLists, setBrachLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { handleSubmit, register } = useForm();

  const handleGetBranch = async () => {
    const branches = await postFetcher("/branch/read");
    setBrachLists(branches.rows);
    setMounted(true);
  };

  useEffect(() => {
    handleGetBranch();
  }, []);

  const handleServiceGroups = async (services) => {
    setLoading(true);

    const payload = {
      ...services,
    };

    if (editable && services.service_image.length === 0) {
      delete payload.service_image;
    } else {
      payload.service_image = services.service_image[0];
    }

    const method = "FORM_DATA";
    const fetchRouter = editable
      ? `/service-groups/update/${editable.id}`
      : "/service-groups/create";

    const fetchEvent = await postFetcher(fetchRouter, payload, method);

    if (fetchEvent && !fetchEvent.error) {
      setSuccess(true);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, [2000]);
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit(handleServiceGroups)} className="overflow-y-auto px-10">
      {loading && <LoadingComponent success={success} editable={editable !== undefined} />}
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Hizmet İçeriği
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-10">
          <GridSpan span="col-span-12">
            <CustomInput
              name="service_group_name"
              defaultValue={editable?.service_group_name}
              innerRef={register("service_group_name", { required: true })}
              label="Hizmet Başlığı"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Bursa şubesi"
            />
          </GridSpan>
          <GridSpan span="col-span-6">
            <div className="pt-2 relative">
              <select
                name="service_group_gender"
                {...register("service_group_gender", { required: true })}
                defaultValue={editable?.service_group_gender}
                className="border rounded-sm w-full px-4 py-3"
              >
                <option disabled value="">
                  Seçiniz
                </option>
                <option value="1">Erkek</option>
                <option value="2">Kadın</option>
              </select>
              <CustomLabel label="Cinsiyet" />
            </div>
          </GridSpan>
          <GridSpan span="col-span-6">
            {mounted && (
              <div className="pt-2 relative">
                <select
                  name="service_group_branch"
                  {...register("service_group_branch", { required: true })}
                  defaultValue={editable ? editable.service_group_branch : ""}
                  className="border rounded-sm w-full px-4 py-3"
                >
                  <option disabled value="">
                    Seçiniz
                  </option>
                  {branchLists.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.branch_name}
                    </option>
                  ))}
                </select>
                <CustomLabel label="Hizmet Şubesi" />
              </div>
            )}
          </GridSpan>
          <GridSpan span="col-span-12">
            <label
              className="bg-blue-50 border border-blue-200 rounded-md w-full block text-center py-6
              "
              htmlFor="bg_image"
            >
              {editable ? "Yeni resim seç" : "Resim seç"}
            </label>
            <input
              className="hidden"
              name="service_image"
              {...register("service_image", { required: editable ? false : true })}
              id="bg_image"
              type="file"
            />
            {editable && editable.service_group_image && (
              <img
                src={`${baseURL}/${editable.service_group_image}`}
                className="w-full rounded-xl object-cover h-[200px] mt-2 shadow-md"
              />
            )}
          </GridSpan>
          <GridSpan span="col-span-12">
            <button
              className="px-4 py-2 bg-gray-900 hover:bg-opacity-90 text-white rounded-md"
              type="submit"
            >
              {editable ? "Güncelle" : "Grup Ekle"}
            </button>
          </GridSpan>
        </GridCol>
      </div>
    </form>
  );
}
