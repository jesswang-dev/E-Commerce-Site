import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    itemList: [],
    amount: 0,
    subtotal: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.itemList = [...state.itemList, action.payload];
            // console.log(action.payload);
            const { price } = action.payload;
            const { quantity } = action.payload;
            state.amount += quantity;
            state.subtotal += price;
        },
        // addToExisted: (state, action) => {
        //     const [index, item] = action.payload;
        //     state.itemList = [...state.itemList][index].quantity
        //     const { price } = item.price;
        //     const { quantity } = item.quantity;
        //     state.amount += quantity;
        //     state.subtotal += price;
        // },

        emptyCart: () => {
            return initialState;
        }
    }
})

export const { addToCart, addToExisted, emptyCart } = cartSlice.actions;

export default cartSlice.reducer