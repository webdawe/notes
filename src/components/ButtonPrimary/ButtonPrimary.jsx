import s from "./style.module.css";
export function ButtonPrimary({ children, OnClick, isDisabled }) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`btn btn-primary ${s.button}`}
      onClick={OnClick}
    >
      {children}
    </button>
  );
}
