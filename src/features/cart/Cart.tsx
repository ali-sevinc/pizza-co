import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";

import { MenuType } from "../menu/Menu";

import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="flex flex-col px-2 py-3 sm:px-4">
      <LinkButton to="/menu" type="link">
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-8 text-xl font-semibold ">
        Your cart, <span className="uppercase">{username}</span>
      </h2>

      <ul className="mt-3 divide-y-2 border-b-2">
        {cart.map((item) => (
          <CartItem
            item={item}
            key={item.pizzaId}
            isIngredientLoading={fetcher.state === "loading"}
            ingredients={
              fetcher.data &&
              fetcher.data.find((i: MenuType) => i.id === item.pizzaId)
                .ingredients
            }
          />
        ))}
      </ul>

      <div className="mt-8 space-x-2">
        <Button type="button" disabled={false} to="/order/new">
          Order pizzas
        </Button>
        <Button
          type="button"
          style="secondary"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
