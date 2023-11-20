import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PropsType {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type: "button" | "submit";
  onClick?: () => void;
  style?: "primary" | "small" | "secondary";
}

const commonStyle =
  " transition-colors-200 rounded-full bg-yellow-400 uppercase text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-yellow-400 duration-200  ";
const className: { primary: string; small: string; secondary: string } = {
  primary:
    "px-4 py-3 text-sm font-semibold tracking-widest sm:px-6 sm:py-4 " +
    commonStyle,
  small:
    "px-2 py-1 text-xs font-medium tracking-tight sm:px-3 sm:py-1.5 sm:text-sm " +
    commonStyle,
  secondary:
    " transition-colors-200 text-sm text-stone-400 rounded-full uppercase border-2 border-stone-300 px-4 py-[9px] font-semibold tracking-widest sm:px-6 sm:py-[13px] hover:text-stone-800  hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-stone-300 duration-200 ",
};

export default function Button({
  children,
  disabled,
  onClick,
  to,
  style = "primary",
  type = "button",
}: PropsType) {
  if (to)
    return (
      <Link to={to} className={className[style]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={className[style]}
        type={type}
      >
        {children}
      </button>
    );

  return (
    <button disabled={disabled} type={type} className={className[style]}>
      {children}
    </button>
  );
}
