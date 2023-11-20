import { ActionFunction, useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="submit" style="primary">
        Make priority
      </Button>
    </fetcher.Form>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const updateAction: ActionFunction = async ({ params }) => {
  const data = { priority: true };
  const id = params.orderId;
  await updateOrder(id!, data);
  return null;
};
