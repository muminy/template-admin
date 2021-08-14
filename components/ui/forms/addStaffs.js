import CustomInput from "../form-elements/input";

import dynamic from "next/dynamic";
import { GridCol, GridSpan } from "../GridArea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseURL, postFetcher } from "services/swr";
import CustomLabel from "../form-elements/label";
import LoadingComponent from "../form-elements/loading";
import { LabelOfUpload } from "../form-elements/fileUpload";

const Editor = dynamic(
  () => import("components/ui/editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

export default function AddStaffs({ editable }) {
  const [staffTypes, setStaffTypes] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { handleSubmit, register } = useForm();

  const handleGetBranch = async () => {
    const groupLists = await postFetcher("/staff-types/read");
    setStaffTypes(groupLists.rows);
    setMounted(true);
  };

  const handleStaff = async (staff_data) => {
    setLoading(true);

    const payload = {
      ...staff_data,
    };

    if (editable && staff_data.staff_image.length === 0) {
      delete payload.staff_image;
    } else {
      payload.staff_image = staff_data.staff_image[0];
    }

    const method = "FORM_DATA";
    const fetchRouter = editable ? `/staffs/update/${editable.id}` : "/staffs/create";

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

  useEffect(() => {
    // handleGetBranch();
  }, []);

  return (
    <form onSubmit={handleSubmit(handleStaff)} className="px-10">
      {loading && <LoadingComponent success={success} editable={editable !== undefined} />}

      <GridCol cols="grid-cols-12" className="gap-5">
        <GridSpan span="col-span-6">
          <CustomInput
            name="staff_name"
            defaultValue={editable?.staff_name}
            innerRef={register("staff_name", { required: true })}
            label="Personel Adı"
            placeholder="Bursa şubesi"
          />
        </GridSpan>
        <GridSpan span="col-span-6">
          <CustomInput
            name="staff_bio"
            defaultValue={editable?.staff_bio}
            innerRef={register("staff_bio", { required: true })}
            label="Personel bio"
            placeholder="Bursa şubesi"
          />
        </GridSpan>
        <GridSpan span="col-span-12">
          <LabelOfUpload />
          <input
            className="hidden"
            name="staff_image"
            {...register("staff_image", { required: editable ? false : true })}
            id="bg_image"
            type="file"
          />
          {editable && editable.staff_image_url && (
            <img
              src={`${baseURL}/${editable.staff_image_url}`}
              className="w-full rounded-xl object-cover h-[200px] mt-2 shadow-md"
            />
          )}
        </GridSpan>
        <GridSpan span="col-span-6">
          <CustomInput
            name="staff_twitter"
            defaultValue={editable?.staff_twitter}
            innerRef={register("staff_twitter")}
            label="Twitter"
            placeholder="Bursa şubesi"
          />
        </GridSpan>
        <GridSpan span="col-span-6">
          <CustomInput
            name="staff_facebook"
            defaultValue={editable?.staff_facebook}
            innerRef={register("staff_facebook")}
            label="Facebook"
            placeholder="Bursa şubesi"
          />
        </GridSpan>
        <GridSpan span="col-span-6">
          <CustomInput
            name="staff_instagram"
            defaultValue={editable?.staff_instagram}
            innerRef={register("staff_instagram")}
            label="Instagram"
            placeholder="Bursa şubesi"
          />
        </GridSpan>
        <GridSpan span="col-span-12">
          <button
            className="px-4 py-2 bg-gray-900 hover:bg-opacity-90 text-white rounded-md"
            type="submit"
          >
            {editable ? "Güncelle" : "Personel Ekle"}
          </button>
        </GridSpan>
      </GridCol>
    </form>
  );
}
