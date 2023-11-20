import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { addItem, removeItem } from "../cart/cartSlice";

import { formatCurrency } from "../../utils/helpers";
import { MenuType } from "./Menu";

import UpdateItem from "../cart/UpdateItem";
import Button from "../../ui/Button";

interface PropsType {
  pizza: MenuType;
}

function MenuItem({ pizza }: PropsType) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  /*
  //this approach causes unnecessary re-renders.
  const cart = useSelector((state: RootState) => state.cart.cart);
  const isItemInCart = cart.find((item) => item.pizzaId === id);
  console.log(isItemInCart);  
  */
  const itemQuantity = useSelector(
    (state: RootState) =>
      state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );
  // console.log(itemQuantity);

  function handleAddItem() {
    const pizzaData = {
      name,
      unitPrice,
      pizzaId: id,
      quantity: 1,
      totalPrice: unitPrice,
    };
    dispatch(addItem({ pizzaData }));
  }
  function handleRemoveItem() {
    dispatch(removeItem({ pizzaId: id }));
  }

  return (
    <li className="flex gap-4 py-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut && "opacity-75 grayscale"}`}
      />
      <div className="mt-0.5 flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="tex-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!itemQuantity && !soldOut && (
            <Button
              type="button"
              style="small"
              onClick={handleAddItem}
              disabled={soldOut}
            >
              Add to cart
            </Button>
          )}
          {itemQuantity > 0 && (
            <UpdateItem
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              quantity={itemQuantity}
              pizzaId={id}
            />
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
