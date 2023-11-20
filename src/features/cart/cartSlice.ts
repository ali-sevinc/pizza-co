import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PizzaType = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};
interface CartState {
  cart: PizzaType[];
}
const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ pizzaData: PizzaType }>) => {
      const existedItem = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaData.pizzaId,
      );

      if (existedItem) {
        state.cart = state.cart.map((item) =>
          item.pizzaId === existedItem.pizzaId
            ? {
                ...item,
                quantity: existedItem.quantity + 1,
                totalPrice: existedItem.totalPrice + existedItem.unitPrice,
              }
            : item,
        );
      } else {
        state.cart = [...state.cart, action.payload.pizzaData];
      }
    },

    deleteItem: (state, action: PayloadAction<{ pizzaId: number }>) => {
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload.pizzaId,
      );
    },

    removeItem: (state, action: PayloadAction<{ pizzaId: number }>) => {
      const existedItem = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (existedItem?.quantity === 1) {
        cartSlice.caseReducers.deleteItem(state, action);
        // state.cart = state.cart.filter(
        //   (item) => item.pizzaId !== action.payload.pizzaId,
        // );
      } else {
        state.cart = state.cart.map((item) =>
          item.pizzaId === existedItem?.pizzaId
            ? {
                ...item,
                quantity: existedItem.quantity - 1,
                totalPrice: existedItem.totalPrice - existedItem.unitPrice,
              }
            : item,
        );
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, clearCart, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
