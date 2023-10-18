import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemList: [],
  itemQuantity: {},
  itemSubtotal: {},
  amount: 0,
  subtotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.itemList = [...state.itemList, action.payload];
      const { price, id, color, size } = action.payload;
      const key = String(id + color + size);
      state.itemQuantity = { ...state.itemQuantity, [key]: 1 };
      state.itemSubtotal = { ...state.itemSubtotal, [key]: price };
      state.amount += 1;
      state.subtotal += price;
    },
    addToExisted: (state, action) => {
      const { price, id, color, size } = action.payload;
      const key = String(id + color + size);
      state.itemQuantity = {
        ...state.itemQuantity,
        [key]: state.itemQuantity[key] + 1,
      };
      state.itemSubtotal = {
        ...state.itemSubtotal,
        [key]: state.itemSubtotal[key] + price,
      };
      state.amount += 1;
      state.subtotal += price;
    },
    incrementItem: (state, action) => {
      const { key, price } = action.payload;
      state.itemQuantity = {
        ...state.itemQuantity,
        [key]: state.itemQuantity[key] + 1,
      };
      state.itemSubtotal = {
        ...state.itemSubtotal,
        [key]: state.itemSubtotal[key] + price,
      };
      state.amount += 1;
      state.subtotal += price;
    },
    decrementItem: (state, action) => {
      const { key, price } = action.payload;
      state.itemQuantity = {
        ...state.itemQuantity,
        [key]: state.itemQuantity[key] - 1,
      };
      state.itemSubtotal = {
        ...state.itemSubtotal,
        [key]: state.itemSubtotal[key] - price,
      };
      state.amount -= 1;
      state.subtotal -= price;
    },
    deleteItem: (state, action) => {
        const { key, index } = action.payload;
        console.log(`in deleteItem`, index);
        state.itemList = [...state.itemList.filter((item, i) => i !== index)];
        state.amount -= state.itemQuantity[key];
        state.subtotal -= state.itemSubtotal[key];
        state.itemQuantity = {
          ...state.itemQuantity,
          [key]: 0,
        };
        state.itemSubtotal = {
          ...state.itemSubtotal,
          [key]: 0
        };

    },
    emptyCart: () => {
      return initialState;
    },
  },
});

export const {
  addToCart,
  addToExisted,
  incrementItem,
  decrementItem,
  deleteItem,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
