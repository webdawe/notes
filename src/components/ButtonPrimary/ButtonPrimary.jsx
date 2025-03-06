import s from "./style.module.css";
export function ButtonPrimary({
  className,
  type,
  children,
  OnClick,
  isDisabled,
}) {
  return (
    <button
      type={type || "button"}
      disabled={isDisabled}
      className={`btn btn-primary ${s.button} ${className}`}
      onClick={OnClick}
    >
      {children}
    </button>
  );
}
