import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home.tsx";
import Menu, { menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { orderLoader } from "./features/order/Order";
import CreateOrder, { orderAction } from "./features/order/CreateOrder";
import { updateAction } from "./features/order/UpdateOrder.tsx";
import AppLayout from "./ui/AppLayout.tsx";
import Error from "./ui/Error.tsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder />, action: orderAction },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: updateAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
