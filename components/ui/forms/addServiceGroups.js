import { useEffect, useState } from "react";
import { baseURL, postFetcher } from "services/swr";
import CustomInput from "../form-elements/input";
import CustomLabel from "../form-elements/label";
import { useForm } from "react-hook-form";
import { GridCol, GridSpan } from "../GridArea";
import LoadingComponent from "../form-elements/loading";
import { Select } from "../form-elements/select";
import { LabelOfUpload } from "../form-elements/fileUpload";

export default function AddServiceGroups({ editable }) {
  const [branchLists, setBrachLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const branch_lists = [
    { id: "1", value: "Kocaeli" },
    { id: "2", value: "İstanbul" },
  ];

  const { handleSubmit, register } = useForm();

  const handleGetBranch = async () => {
    const branches = await postFetcher("/branch/read");
    setBrachLists(branches.rows);
    setMounted(true);
  };

  useEffect(() => {
    // handleGetBranch();
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
        <GridCol cols="grid-cols-12" className="w-full gap-10">
          <GridSpan span="col-span-12">
            <CustomInput
              name="service_group_name"
              defaultValue={editable?.service_group_name}
              innerRef={register("service_group_name", { required: true })}
              label="Hizmet Başlığı"
              placeholder="Bursa şubesi"
            />
          </GridSpan>
          <GridSpan span="col-span-6">
            <div className="pt-2 relative">
              <div className="font-bold mb-2">Cinsiyet</div>
              <Select
                options={[
                  { id: "1", value: "Erkek" },
                  { value: "Kadın", id: "2" },
                ]}
              />
            </div>
          </GridSpan>
          <GridSpan span="col-span-6">
            <div className="pt-2 relative">
              <div className="font-bold mb-2">Hizmet Şubesi</div>
              <Select options={branch_lists} />
            </div>
          </GridSpan>
          <GridSpan span="col-span-12">
            <LabelOfUpload />
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
