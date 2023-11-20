import { useState } from "react";

import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/apiRestaurant";
import { AppDispatch, RootState, store } from "../../store/store";
import { clearCart } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";

import { CartType } from "./Order";
import { formatCurrency, isValidPhone } from "../../utils/helpers";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

export interface FormDataType {
  customer: string;
  address: string;
  phone: string;
  priority: boolean | string;
  cart: CartType[];
}

type ErrorType = { phone?: string };

function CreateOrder() {
  const [isPriority, setIsPriority] = useState<string>("");

  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const user = useSelector((state: RootState) => state.user);

  const { username, address, status, error, posisiton } = user;

  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalAmount =
    cart.reduce((acc, item) => acc + item.totalPrice, 0) *
    (isPriority === "on" ? 1.2 : 1);

  const dispatch = useDispatch<AppDispatch>();

  const formErrors = useActionData() as ErrorType;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className=" px-4 py-6 ">
      <h2 className="mb-8 text-xl font-semibold ">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            disabled={submitting}
            type="text"
            name="customer"
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              disabled={submitting}
              type="tel"
              name="phone"
              required
              className="input w-full "
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-300 p-2 text-center text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={submitting || status === "loading"}
              defaultValue={address || ""}
              type="text"
              name="address"
              required
              className="input w-full "
            />
            {address === "" && (
              <div className="absolute right-1 top-[38px] sm:top-[3px] md:top-2">
                <Button
                  disabled={status === "loading"}
                  type="button"
                  style="small"
                  onClick={() => dispatch(fetchAddress())}
                >
                  Get address
                </Button>
              </div>
            )}
            {status === "reject" && (
              <p className="mt-2 rounded-md bg-red-300 p-2 text-center text-xs text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            value={isPriority}
            onChange={(e) => setIsPriority(e.target.checked ? "on" : "")}
            disabled={submitting}
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-1"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <Button type="submit" disabled={submitting}>
            {submitting
              ? "Placing order..."
              : `Order now (for ${formatCurrency(totalAmount)})`}
          </Button>
        </div>

        <input value={JSON.stringify(cart)} name="cart" type="hidden" />
        <input
          value={
            posisiton.latitude && posisiton.longitude
              ? `${posisiton.latitude}, ${posisiton.longitude}`
              : ""
          }
          name="position"
          type="hidden"
        />
      </Form>
    </div>
  );
}

export default CreateOrder;

// eslint-disable-next-line react-refresh/only-export-components
export const orderAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const entries = Array.from(formData);
  const data: Partial<FormDataType> = Object.fromEntries(
    entries.map(([key, value]) => {
      return key === "cart" ? [key, JSON.parse(value as string)] : [key, value];
    }),
  );
  const order = {
    ...data,
    priority: data.priority === "on",
  } as FormDataType;
  const errors: ErrorType = {};
  if (!isValidPhone(order.phone!))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  //dont overuse!
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};
