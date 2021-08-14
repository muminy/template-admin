import classNames from "classnames";

export default function Flexible({
  tag: Component = "div",
  className,
  children,
  onClick,
  href = "/",
}) {
  return (
    <Component href={href} onClick={onClick} className={classNames(className, "flex")}>
      {children}
    </Component>
  );
}
