import classNames from "classnames";
import { GridCol, GridSpan } from "components/ui/GridArea";

export default function Layout({ children, rightSidebar = () => "" }) {
  return (
    <GridCol cols="grid-cols-12" className="w-full">
      <GridSpan
        span={classNames("col-span-12 xl:col-span-9", { "!col-span-12": !rightSidebar() })}
        className="p-4 !pb-0 xl:p-10 lg:p-8 ayout-area min-h-screen relative bg-[#f5f9fe] rounded-br-none rounded-bl-none rounded-tr-[20px] xl:rounded-tr-[20px] rounded-tl-[20px] xl:rounded-tl-[20px] lg:rounded-tl-[20px] md:rounded-tr-none md:rounded-tl-none rounded-[20px]"
      >
        {children}
      </GridSpan>
      <GridSpan
        span="col-span-12 hidden xl:block xl:col-span-3"
        className={classNames("p-4 xl:p-8 lg:p-8 !pt-2 overflow-y-auto", {
          "!hidden": !rightSidebar(),
        })}
      >
        {rightSidebar()}
      </GridSpan>
    </GridCol>
  );
}
