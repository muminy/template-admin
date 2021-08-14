import { routers } from "helpers/routers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Searchbar() {
  const { pathname } = useRouter();
  const [routerLists, setRouter] = useState(null);

  useEffect(() => {
    setRouter(routers);
  }, []);

  return (
    <div className="ml-0 xl:ml-[160px] xl:mr-auto mr-0 lg:mr-auto lg:ml-[160px] font-semibold text-lg">
      {routerLists ? (
        routerLists.find((item) => item.href === pathname).title
      ) : (
        <div className="w-[120px] h-4 rounded-xl bg-gray-200" />
      )}
    </div>
  );
}
