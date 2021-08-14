import CustomInput from "../form-elements/input";

import dynamic from "next/dynamic";
import { GridCol, GridSpan } from "../GridArea";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { postFetcher } from "services/swr";
import initialData from "components/ui/editor/data.json";
import { useLoadData, useSetData } from "components/ui/editor";
import LoadingComponent from "../form-elements/loading";

const Editor = dynamic(
  () => import("components/ui/editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

export default function addBranch({ editable }) {
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { handleSubmit, register } = useForm();
  useSetData(editor, editable ? JSON.parse(editable?.branch_content) : initialData);

  const handleCreate = async (branch_data) => {
    setLoading(true);

    const fetchRoute = editable ? `/branch/update/${editable.id}` : "/branch/create";

    const { data: branch_content } = await useLoadData(editor);
    const fetchBranch = await postFetcher(fetchRoute, {
      ...branch_data,
      branch_content: JSON.stringify(branch_content),
    });

    if (fetchBranch && !fetchBranch.error) {
      setSuccess(true);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => window.location.reload(), 2000);
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit(handleCreate)} className="overflow-y-auto px-4 xl:px-10 lg:px-6">
      {loading && <LoadingComponent editable={editable !== undefined} success={success} />}
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-full xl:w-1/5 lg:w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Şube İçerik
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-5">
          <GridSpan span="col-span-12">
            <CustomInput
              defaultValue={editable?.branch_name}
              name="branch_name"
              innerRef={register("branch_name", { required: true })}
              label="Şube İsmi"
              className="border rounded-sm w-full px-4 py-3 mb-4 xl:mb-0 lg:mb-0"
              placeholder="Bursa şubesi"
            />
          </GridSpan>
          <GridSpan span="col-span-12 relative">
            <div className="border-t rounded-sm w-full px-4 py-2">
              <Editor reInit editorRef={setEditor} />

              <div className="absolute text-gray-600 ml-[-8px] top-[-8px] px-2 text-sm font-semibold bg-white">
                Şube içeriği
              </div>
            </div>
          </GridSpan>
        </GridCol>
      </div>
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-full xl:w-1/5 lg:w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0">
          Şube İletişim
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-5">
          <GridSpan span="col-span-12 xl:col-span-6 lg:col-span-6">
            <CustomInput
              name="branch_adress"
              defaultValue={editable?.branch_adress}
              innerRef={register("branch_adress", { required: true })}
              label="Adress"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="İstanbu/Kadıköy ..."
            />
          </GridSpan>
          <GridSpan span="col-span-12 xl:col-span-6 lg:col-span-6">
            <CustomInput
              name="branch_mail"
              defaultValue={editable?.branch_mail}
              innerRef={register("branch_mail", { required: true })}
              label="Mail"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="info@ex.com"
            />
          </GridSpan>
          <GridSpan span="col-span-12 xl:col-span-6 lg:col-span-6">
            <CustomInput
              name="branch_phone"
              defaultValue={editable?.branch_phone}
              innerRef={register("branch_phone", { required: true })}
              label="Telefon"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="+9 0555 555 55 55"
            />
          </GridSpan>
          <GridSpan span="col-span-12">
            <button
              className="px-4 py-2 bg-gray-900 hover:bg-opacity-90 text-white rounded-md"
              type="submit"
            >
              {editable ? "Güncelle" : "Şube Ekle"}
            </button>
          </GridSpan>
        </GridCol>
      </div>
    </form>
  );
}
