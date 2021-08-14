import CustomInput from "../form-elements/input";

import dynamic from "next/dynamic";
import { GridCol, GridSpan } from "../GridArea";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import CustomLabel from "../form-elements/label";

import { useForm } from "react-hook-form";
import { baseURL, postFetcher } from "services/swr";
import { useEffect, useState } from "react";
import { useLoadData, useSetData } from "../editor";

import moment from "moment";
import initialData from "components/ui/editor/data.json";
import "moment/locale/tr";
import LoadingComponent from "../form-elements/loading";

const Editor = dynamic(
  () => import("components/ui/editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

export default function AddEvent({ editable }) {
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    editable ? moment(editable.event_finish_date).format("YYYY-MM-DD") : null
  );
  const { handleSubmit, register } = useForm();

  useSetData(editor, editable ? JSON.parse(editable?.event_content) : initialData);

  const handleEvent = async (events) => {
    setLoading(true);

    if (!selectedDate) return;

    const { data: event_content } = await useLoadData(editor);

    const payload = {
      ...events,
      event_finish_date: selectedDate,
      event_content: JSON.stringify(event_content),
    };

    if (editable && events.event_image.length === 0) {
      delete payload.event_image;
    } else {
      payload.event_image = events.event_image[0];
    }

    const method = "FORM_DATA";
    const fetchRouter = editable ? `/event/update/${editable.id}` : "/event/create";

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
    <form onSubmit={handleSubmit(handleEvent)} className="px-10">
      {loading && <LoadingComponent editable={editable !== undefined} success={success} />}
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-full xl:w-1/5 lg:w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Etkinlik İçeriği
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-5">
          <GridSpan span="col-span-12">
            <CustomInput
              label="Etkinlik başlığı"
              name="event_title"
              defaultValue={editable?.event_title}
              innerRef={register("event_title", { required: true })}
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Şenlik"
            />
          </GridSpan>
          <GridSpan span="col-span-12">
            <CustomInput
              tag="textarea"
              name="event_short_desc"
              defaultValue={editable?.event_short_desc}
              innerRef={register("event_short_desc", { required: true })}
              label="Etkinlik kısa içerik"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Yarın başlıyoor"
            />
          </GridSpan>
          <GridSpan span="col-span-12 mb-4">
            <div className="pt-2 relative">
              <Datetime
                locale={"tr"}
                dateFormat="YYYY-MM-DD"
                timeFormat=""
                value={selectedDate}
                inputProps={{
                  className: "border rounded-sm w-full px-4 py-3",
                }}
                onChange={(date) => setSelectedDate(moment(date).format("YYYY-MM-DD"))}
              />
              <CustomLabel label="Bitiş Tarihi" />
            </div>
          </GridSpan>
          <GridSpan span="col-span-12 relative">
            <div className="border-t rounded-sm w-full px-4 py-2">
              <Editor reInit editorRef={setEditor} />

              <div className="absolute text-gray-600 ml-[-8px] top-[-8px] px-2 text-sm font-semibold bg-white">
                Etkinlik içeriği
              </div>
            </div>
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
              name="event_image"
              {...register("event_image", { required: editable ? false : true })}
              id="bg_image"
              type="file"
            />
            {editable && editable.event_image_url && (
              <img
                src={`${baseURL}/${editable.event_image_url}`}
                className="w-full rounded-xl object-cover h-[200px] mt-2 shadow-md"
              />
            )}
          </GridSpan>
          <GridSpan span="col-span-12">
            <button
              className="px-4 py-2 bg-gray-900 hover:bg-opacity-90 text-white rounded-md"
              type="submit"
            >
              {editable ? "Güncelle" : "Etkinlik Ekle"}
            </button>
          </GridSpan>
        </GridCol>
      </div>
    </form>
  );
}
