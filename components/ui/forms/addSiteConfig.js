import CustomInput from "../form-elements/input";

import dynamic from "next/dynamic";
import { GridCol, GridSpan } from "../GridArea";
import { useForm } from "react-hook-form";
import { baseURL, postFetcher } from "services/swr";
import { useEffect, useState } from "react";
import LoadingComponent from "../form-elements/loading";

const Editor = dynamic(
  () => import("components/ui/editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

export default function AddSiteConfig({ editable }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { handleSubmit, register } = useForm();

  const handleBlog = async (blog_items) => {
    setLoading(true);

    const method = "FORM_DATA";
    const fetchRouter = "/site-settings/update";

    const payload = {
      ...blog_items,
    };

    const fetchBlog = await postFetcher(fetchRouter, payload, method);

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
          Site Genel
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-5">
          <GridSpan span="col-span-12 relative">
            <CustomInput
              defaultValue={editable?.site_vision}
              name="site_vision"
              tag="textarea"
              innerRef={register("site_vision", { required: true })}
              label="Visyon"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Visyonumuz..."
            />
          </GridSpan>
          <GridSpan span="col-span-12 relative">
            <CustomInput
              defaultValue={editable?.site_mission}
              name="site_mission"
              tag="textarea"
              innerRef={register("site_mission", { required: true })}
              label="Misyon"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Misyonumuz.."
            />
          </GridSpan>
          <GridSpan span="col-span-12 relative">
            <CustomInput
              defaultValue={editable?.site_about_us}
              name="site_about_us"
              tag="textarea"
              innerRef={register("site_about_us", { required: true })}
              label="Hakkımızda"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Hakkımızda.."
            />
          </GridSpan>
        </GridCol>
      </div>
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Site İletişim
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-5">
          <GridSpan span="col-span-12 relative">
            <CustomInput
              defaultValue={editable?.site_address}
              name="site_address"
              innerRef={register("site_address", { required: true })}
              label="Adres"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="Kocaleli.."
            />
          </GridSpan>
          <GridSpan span="col-span-4 relative">
            <CustomInput
              defaultValue={editable?.site_mail}
              name="site_mail"
              innerRef={register("site_mail", { required: true })}
              label="Mail Adresi"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="info@.."
            />
          </GridSpan>
          <GridSpan span="col-span-4">
            <CustomInput
              defaultValue={editable?.site_call_phone}
              name="site_call_phone"
              innerRef={register("site_call_phone", { required: true })}
              label="İletişim Numara"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="+90530..."
            />
          </GridSpan>
          <GridSpan span="col-span-4">
            <CustomInput
              defaultValue={editable?.site_wp_phone}
              name="site_wp_phone"
              innerRef={register("site_wp_phone", { required: true })}
              label="Whatsapp iletişim"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="+90530..."
            />
          </GridSpan>
        </GridCol>
      </div>
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Site Sosyal Medya
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-5">
          <GridSpan span="col-span-4 relative">
            <CustomInput
              defaultValue={editable?.site_facebook}
              name="site_facebook"
              innerRef={register("site_facebook", { required: true })}
              label="Facebook"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="fb.com/username"
            />
          </GridSpan>
          <GridSpan span="col-span-4 relative">
            <CustomInput
              defaultValue={editable?.site_youtube}
              name="site_youtube"
              innerRef={register("site_youtube", { required: true })}
              label="Youtube"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="channel/username.."
            />
          </GridSpan>
          <GridSpan span="col-span-4">
            <CustomInput
              defaultValue={editable?.site_instagram}
              name="site_instagram"
              innerRef={register("site_instagram", { required: true })}
              label="İnstagram"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="IG.com/username"
            />
          </GridSpan>
        </GridCol>
      </div>
      <div className="block xl:flex lg:flex mb-10">
        <div className="w-1/5 font-black tracking-wide uppercase text-gray-600 mb-8 xl:mb-0 lg:mb-0">
          Site Admin
        </div>
        <GridCol cols="grid-cols-12" className="w-full xl:w-4/5 lg:w-4/5 gap-5">
          <GridSpan span="col-span-6 relative">
            <CustomInput
              defaultValue={editable?.site_admin_username}
              name="site_admin_username"
              innerRef={register("site_admin_username", { required: true })}
              label="Admin Kullanıcı adı"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="username"
            />
          </GridSpan>
          <GridSpan span="col-span-6 relative">
            <CustomInput
              defaultValue={editable?.site_admin_password}
              name="site_admin_password"
              innerRef={register("site_admin_password", { required: true })}
              label="Admin şifre"
              className="border rounded-sm w-full px-4 py-3"
              placeholder="****"
              type="password"
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
