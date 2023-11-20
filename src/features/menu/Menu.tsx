import { useLoaderData } from "react-router-dom";

import { getMenu } from "../../services/apiRestaurant";

import MenuItem from "./MenuItem";

export type MenuType = {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
};

function Menu() {
  const menu = useLoaderData() as MenuType[];

  return (
    <ul className=" divide-y-2 divide-stone-300 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export default Menu;

// eslint-disable-next-line react-refresh/only-export-components
export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}
