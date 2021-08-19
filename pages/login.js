import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleUserLogin, handleSetToken } from "services/auth";
import { setToken } from "store/actions/user";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const { handleSubmit, register } = useForm();

  const _userLogin = async (payload) => {
    setLoading(true);
    try {
      const userLogin = await handleUserLogin(payload);

      if (userLogin.code && userLogin.code === 200) {
        handleSetToken(userLogin.token);
        dispatch(setToken(userLogin.token));
        setSuccess("Giriş başarılı");
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage("Email yada şifre hatalı");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [success]);

  return (
    <form
      onSubmit={handleSubmit(_userLogin)}
      className="h-screen bg-[#f5f9fe] w-full flex items-center justify-center "
    >
      <div className="w-full overflow-y-auto xl:overflow-y-hidden lg:overflow-y-hidden xl:max-w-[360px] lg:max-w-[360px] md:max-w-[360px] h-screen flex items-center justify-center">
        <div className="w-full px-10">
          {errorMessage && <div className="text-red-500 mb-4 font-semibold">{errorMessage}</div>}
          {success && <div className="text-green-500 mb-4 font-semibold">{success}</div>}
          <div className="border border-[#d4e7ff] rounded-md overflow-hidden">
            <input
              placeholder="E-mail"
              type="text"
              {...register("email", { required: true })}
              className="px-4 py-3 focus:outline-none w-full border-b border-[#d4e7ff]"
            />
            <input
              placeholder="Şifre"
              type="password"
              {...register("password", { required: true })}
              className="px-4 py-3 focus:outline-none w-full border-b border-[#d4e7ff]"
            />
            <button
              type="submit"
              className="px-4 py-3 focus:outline-none w-full bg-white hover:opacity-90"
            >
              {loading ? "Giriş yapılıyor" : "Giriş yap"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
