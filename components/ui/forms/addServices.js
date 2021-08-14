import CustomInput from "../form-elements/input";

import dynamic from "next/dynamic";
import { GridCol, GridSpan } from "../GridArea";
import { useState, useEffect, Fragment } from "react";
import { baseURL, postFetcher } from "services/swr";
import { useForm } from "react-hook-form";
import CustomLabel from "../form-elements/label";
import initialData from "components/ui/editor/data.json";
import { useLoadData, useSetData } from "../editor";
import LoadingComponent from "../form-elements/loading";

const Editor = dynamic(
  () => import("components/ui/editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

export default function AddServices({ editable }) {
  const [editor, setEditor] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [faqs, setFAQs] = useState(
    editable ? JSON.parse(editable.service_faq) : [{ question: "", answer: "" }]
  );

  const { handleSubmit, register } = useForm();

  useSetData(editor, editable ? JSON.parse(editable?.service_content) : initialData);

  const handleGetBranch = async () => {
    const groupLists = await postFetcher("/service-groups/read");
    setGroups(groupLists.rows);
    setMounted(true);
  };

  useEffect(() => {
    handleGetBranch();
  }, []);

  const handleService = async (services) => {
    setLoading(true);

    const faqfilters = faqs.filter((item) => item.question && item.answer);
    const { data: service_content } = await useLoadData(editor);

    const payload = {
      ...services,
      service_content: JSON.stringify(service_content),
      service_faq: JSON.stringify(faqfilters),
    };

    if (editable && services.service_image.length === 0) {
      delete payload.service_image;
    } else {
      payload.service_image = services.service_image[0];
    }

    const method = "FORM_DATA";
    const fetchRouter = editable ? `/services/update/${editable.id}` : "/services/create";

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

  const addNewFaq = () => {
    setFAQs((prevState) => {
      prevState.push({ question: "", answer: "" });
      return [...prevState];
    });
  };

  const removeFaq = (index) => {
    setFAQs((prevState) => {
      prevState.splice(index, 1);
      return [...prevState];
    });
  };

  const setQuestion = (index, value) => {
    setFAQs((prevState) => {
      prevState[index].question = value;
      return [...prevState];
    });
  };

  const setAnswer = (index, value) => {
    setFAQs((prevState) => {
      prevState[index].answer = value;
      return [...prevState];
    });
  };

  return (
    <form onSubmit={handleSubmit(handleService)} className="px-10">
      {loading && <LoadingComponent success={success} editable={editable !== undefined} />}
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Hizmet İçeriği
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-10">
          <GridSpan span="col-span-12">
            <CustomInput
              name="service_name"
              defaultValue={editable?.service_name}
              innerRef={register("service_name", { required: true })}
              label="Hizmet Başlığı"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Bursa şubesi"
            />
          </GridSpan>
          <GridSpan span="col-span-12">
            <CustomInput
              tag="textarea"
              name="service_short_desc"
              defaultValue={editable?.service_short_desc}
              innerRef={register("service_short_desc", { required: true })}
              label="Hizmet Kısa Açıklama"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Bursa şubesi"
            />
          </GridSpan>
          <GridSpan span="col-span-12 relative">
            <div className="border-t rounded-sm w-full px-4 py-2">
              <Editor reInit editorRef={setEditor} />

              <div className="absolute text-gray-600 ml-[-8px] top-[-8px] px-2 text-sm font-semibold bg-white">
                Hizmet içeriği
              </div>
            </div>
          </GridSpan>
        </GridCol>
      </div>
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Hizmet Yapısı
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-10">
          <GridSpan span="col-span-12">
            {mounted && (
              <div className="pt-2 relative">
                <select
                  {...register("service_group_id", { required: true })}
                  defaultValue={editable ? editable?.service_group_id : ""}
                  className="border rounded-sm w-full px-4 py-3"
                >
                  <option value="">Seçiniz</option>
                  {groups.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.service_group_name}
                    </option>
                  ))}
                </select>
                <CustomLabel label="Hizmet grubu" />
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
            {editable && editable.service_cover_image && (
              <img
                src={`${baseURL}/${editable.service_cover_image}`}
                className="w-full rounded-xl object-cover h-[200px] mt-2 shadow-md"
              />
            )}
          </GridSpan>
        </GridCol>
      </div>
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Hizmet Faq
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-10">
          <GridSpan span="col-span-12">
            {faqs.map((item, index) => (
              <div className="mb-5">
                <div>
                  <input
                    defaultValue={item.question}
                    value={item.question}
                    onChange={(text) => setQuestion(index, text.target.value)}
                    className="border mb-1 rounded-sm w-full px-4 py-2"
                    placeholder="Neden biz?"
                  />
                </div>
                <div>
                  <textarea
                    defaultValue={item.answer}
                    value={item.answer}
                    onChange={(text) => setAnswer(index, text.target.value)}
                    className="border rounded-sm w-full px-4 py-2"
                    placeholder="Çünkü ..."
                  />
                </div>
                <button
                  type="button"
                  className="font-medium text-gray-900 text-sm"
                  onClick={() => removeFaq(index)}
                >
                  [Kaldır]
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full shadow-sm rounded-md font-semibold border py-3"
              onClick={addNewFaq}
            >
              Yeni Soru
            </button>
          </GridSpan>
          <GridSpan span="col-span-12">
            <button
              className="px-4 py-2 bg-gray-900 hover:bg-opacity-90 text-white rounded-md"
              type="submit"
            >
              {editable ? "Güncelle" : "Hizmet Ekle"}
            </button>
          </GridSpan>
        </GridCol>
      </div>
    </form>
  );
}
