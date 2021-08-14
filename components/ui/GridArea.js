import classNames from "classnames";

export function GridCol({ cols, className, tag: Component = "div", children }) {
  return <Component className={classNames("grid", className, cols)}>{children}</Component>;
}

export const GridSpan = ({
  span = "col-span-12",
  className,
  tag: Component = "div",
  children,
  style = {},
}) => {
  return (
    <Component style={style} className={classNames(span, className)}>
      {children}
    </Component>
  );
};
