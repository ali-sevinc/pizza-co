import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

import Button from "../../ui/Button";

interface PropsType {
  onRemoveItem: () => void;
  onAddItem: () => void;
  quantity: number;
  pizzaId: number;
}

export default function UpdateItem({
  onAddItem,
  onRemoveItem,
  quantity,
  pizzaId,
}: PropsType) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center  gap-3 sm:gap-8">
      <div className="flex items-center gap-2">
        <Button type="button" onClick={onRemoveItem} style="small">
          -
        </Button>
        <span className="font-bold">{quantity}</span>
        <Button type="button" onClick={onAddItem} style="small">
          +
        </Button>
      </div>
      <Button
        type="button"
        onClick={() => dispatch(deleteItem({ pizzaId }))}
        style="small"
      >
        &times;
      </Button>
    </div>
  );
}
