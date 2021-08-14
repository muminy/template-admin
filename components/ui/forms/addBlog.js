import CustomInput from "../form-elements/input";

import dynamic from "next/dynamic";
import { GridCol, GridSpan } from "../GridArea";
import { useForm } from "react-hook-form";
import { baseURL, postFetcher } from "services/swr";
import { useEffect, useState } from "react";
import { useLoadData, useSetData } from "../editor";
import LoadingComponent from "../form-elements/loading";
import initialData from "components/ui/editor/data.json";

const Editor = dynamic(
  () => import("components/ui/editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

export default function AddBlog({ editable }) {
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { handleSubmit, register } = useForm();

  useSetData(editor, editable ? JSON.parse(editable?.blog_content) : initialData);

  const handleBlog = async (blog_items) => {
    setLoading(true);

    const method = "FORM_DATA";
    const fetchRouter = editable ? `/blog/update/${editable.id}` : "/blog/create";
    const { data: blog_content } = await useLoadData(editor);

    const payload = {
      ...blog_items,
      blog_content: JSON.stringify(blog_content),
    };

    if (editable && blog_items.blog_image.length === 0) {
      delete payload.blog_image;
    } else {
      payload.blog_image = blog_items.blog_image[0];
    }

    const fetchBlog = await postFetcher(fetchRouter, { ...payload }, method);

    if (fetchBlog && !fetchBlog.error) {
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
    <form onSubmit={handleSubmit(handleBlog)} cols="grid-cols-12" className="px-10">
      {loading && <LoadingComponent editable={editable !== undefined} success={success} />}
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Blog İçeriği
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-10">
          <GridSpan span="col-span-12">
            <CustomInput
              name={"blog_title"}
              defaultValue={editable?.blog_title}
              innerRef={register("blog_title", { required: true })}
              label="Blog başlığı"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Bursa şubesi"
            />
          </GridSpan>
          <GridSpan span="col-span-12">
            <CustomInput
              name={"blog_short_desc"}
              defaultValue={editable?.blog_short_desc}
              innerRef={register("blog_short_desc", { required: true })}
              tag="textarea"
              label="Blog kısa içerik"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Bursa şubesi"
            />
          </GridSpan>
          <GridSpan span="col-span-12 relative">
            <div className="border-t rounded-sm w-full px-4 py-2">
              <Editor reInit editorRef={setEditor} />

              <div className="absolute text-gray-600 ml-[-8px] top-[-8px] px-2 text-sm font-semibold bg-white">
                Blog içeriği
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
              name="blog_image"
              {...register("blog_image", { required: editable ? false : true })}
              id="bg_image"
              type="file"
            />
            {editable && editable.blog_cover_image && (
              <img
                src={`${baseURL}/${editable.blog_cover_image}`}
                className="w-full rounded-xl object-cover h-[200px] mt-2 shadow-md"
              />
            )}
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
