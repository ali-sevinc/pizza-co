import { formatCurrency } from "../../utils/helpers";
import { CartType } from "./Order";

interface PropsType {
  item: CartType;
  isLoadingIngredients: boolean;
  ingredients: string[];
}

function OrderItem({ item, isLoadingIngredients, ingredients }: PropsType) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 ">
      <div className="flex items-center justify-between gap-4 text-sm">
        <div>
          <p>
            <span className="font-bold">{quantity}&times;</span> {name}
          </p>
          {isLoadingIngredients && (
            <p className="text-xs italic text-stone-500">Loading...</p>
          )}
          {ingredients?.length && !isLoadingIngredients && (
            <p className="text-xs capitalize italic text-stone-500">
              {ingredients.join(", ")}
            </p>
          )}
        </div>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
