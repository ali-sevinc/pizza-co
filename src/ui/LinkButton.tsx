import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PropsType {
  children: ReactNode;
  type: "button" | "link";
  to?: string;
  onClick?: () => void;
}

const className = "test-sm text-blue-500 hover:text-blue-700 hover:underline";

export default function LinkButton({ children, type, onClick, to }: PropsType) {
  if (type === "link")
    return (
      <Link to={to!} className={className}>
        {children}
      </Link>
    );
  if (type === "button")
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
}
