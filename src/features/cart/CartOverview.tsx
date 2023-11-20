import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../store/store";

import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const numPizzas = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  if (!cart.length) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className=" space-x-4 font-semibold text-stone-300 ">
        <span>
          {numPizzas} pizza{numPizzas === 1 ? "" : "s"}
        </span>
        <span>{formatCurrency(totalAmount)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
