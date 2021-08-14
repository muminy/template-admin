import CustomInput from "components/ui/form-elements/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postFetcher } from "services/swr";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const { handleSubmit, register } = useForm();

  const handleUserLogin = async (user_data) => {
    const handleLogin = await postFetcher("/user/login", user_data);
    if (handleLogin && !handleLogin.error) {
      localStorage.setItem("user@token", handleLogin.userToken);
      window.location.href = "/";
    } else {
      setErrorMessage(handleLogin.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUserLogin)}
      className="h-screen w-full flex items-center justify-center "
    >
      <div className="w-screen overflow-y-auto xl:overflow-y-hidden lg:overflow-y-hidden xl:max-w-[420px] lg:max-w-[420px] md:max-w-[420px] h-screen flex items-center justify-center xl:h-auto lg:h-auto md:h-auto p-0 xl:p-20 lg:p-20 md:p-14 border bg-gray-50 shadow-sm rounded-md">
        <div>
          {errorMessage && (
            <div className="text-red-700 mb-4 font-semibold text-center">{errorMessage}</div>
          )}
          <CustomInput
            name="username"
            innerRef={register("username", { required: true })}
            label="username"
            placeholder="blaa"
            className="border rounded-md py-4 px-6 mb-2 w-full"
          />
          <CustomInput
            name="password"
            innerRef={register("password", { required: true })}
            label="password"
            placeholder="blabla"
            type="password"
            className="border rounded-md py-4 px-6 mb-6 w-full"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-white border text-sm font-semibold rounded-md w-full hover:bg-gray-50"
          >
            Giriş yap
          </button>
        </div>
      </div>
    </form>
  );
}
