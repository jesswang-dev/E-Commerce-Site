import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from "redux-thunk";
import cartReducer from './cart';
import userReducer from './user';

//combine the reducers
const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

//config the persistConfig
const persistConfig = {
  key: "root",
  //persisted data storage, default is localStorage
  storage,
//   blackList: [],
//   whileList: ["counter"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

//
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;