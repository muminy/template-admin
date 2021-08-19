import "styles/tailwind.css";
import "styles/global.css";

import { useEffect, useState } from "react";
import HeaderComponent from "components/core/Header";
import Flexible from "components/ui/Flex";
import SidebarMenu from "components/core/Header/SidebarMenu";
import store from "store/store";

import { useRouter } from "next/router";
import { Provider, useDispatch } from "react-redux";
import { handleGetToken } from "services/auth";
import { LoadingUser } from "components/LoadingUser";
import { setToken } from "store/actions/user";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <UserAuth>
        {router.pathname === "/login" ? (
          <Component {...pageProps} />
        ) : (
          <>
            <HeaderComponent />
            <Flexible>
              <SidebarMenu />
              <Component {...pageProps} />
            </Flexible>
          </>
        )}
      </UserAuth>
    </Provider>
  );
}

export default MyApp;

function UserAuth({ children }) {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const router = useRouter();
  const notFromLoginPage = router.pathname !== "/login";

  useEffect(() => {
    const handleVerifyUserToken = async () => {
      const userToken = await handleGetToken();

      if (!userToken.token && notFromLoginPage) {
        router.push("/login");
      }

      if (userToken.token && !notFromLoginPage) {
        router.push("/");
      }

      if (userToken.token) {
        dispatch(setToken(userToken.token));
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    handleVerifyUserToken();
  }, []);

  if (loading) {
    return <LoadingUser />;
  }

  return <>{children}</>;
}
