import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-b-stone-300 bg-yellow-400 px-2 py-3 uppercase sm:px-6 ">
      <Link to="/" className="tracking-wide sm:tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}
