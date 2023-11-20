import { useDispatch } from "react-redux";

import { formatCurrency } from "../../utils/helpers";
import { addItem, removeItem } from "./cartSlice";

import UpdateItem from "./UpdateItem";

interface PropsType {
  ingredients: string[];
  isIngredientLoading: boolean;
  item: {
    pizzaId: number;
    name: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
  };
}
function CartItem({ item, ingredients, isIngredientLoading }: PropsType) {
  const { pizzaId, name, quantity, totalPrice, unitPrice } = item;

  const dispatch = useDispatch();

  function handleAddItem() {
    const pizzaData = {
      name,
      unitPrice,
      pizzaId,
      quantity: 1,
      totalPrice: unitPrice,
    };
    dispatch(addItem({ pizzaData }));
  }
  function handleRemoveItem() {
    dispatch(removeItem({ pizzaId }));
  }

  return (
    <li className="py-4 sm:flex sm:justify-between">
      <div>
        <p className="mb-1 sm:mb-0">{name}</p>
        {isIngredientLoading && (
          <p className="text-xs capitalize italic text-stone-500">Loading...</p>
        )}
        {ingredients?.length && !isIngredientLoading && (
          <p className="text-xs capitalize italic text-stone-500">
            {ingredients?.join(", ")}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between sm:gap-8">
        <p className="text-sm">{formatCurrency(totalPrice)}</p>
        <UpdateItem
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          quantity={quantity}
          pizzaId={pizzaId}
        />
      </div>
    </li>
  );
}

export default CartItem;
