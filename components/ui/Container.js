import classNames from "classnames";

export default function Container({ tag: Component = "div", className, children }) {
  return (
    <Component
      className={classNames(
        className,
        "container mx-auto max-w-[1330px] px-4 xl:px-6 lg:px-6 md:px-4"
      )}
    >
      {children}
    </Component>
  );
}
