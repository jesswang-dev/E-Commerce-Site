import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {},
  isRegistred: false,
  isSignnedIn: false,
  orderList: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
        console.log(action.payload);
        state.account = action.payload;
        state.isSignnedIn = true;
    }
  },
});

export const {signIn}= userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
