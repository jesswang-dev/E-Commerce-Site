import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import store from "./store/store";
import { persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import ErrorPage from "./Pages/error-page";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Featured from "./Pages/Featured";
import Recomended from "./Pages/Recomended";
import Result from "./Pages/Result";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Account from "./Pages/Account";
import ProductDetails from "./Components/ProductDetails";

/** Import stylesheets */
import "./assets/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

/** Import firebase config file*/
// import "./service/firebaseConfig.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index path="" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="featured" element={<Featured />} />
      <Route path="recommended" element={<Recomended />} />
      <Route path="search/:input" element={<Result />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<LogIn />} />
      <Route path="product/:productId" element={<ProductDetails />} />
      <Route path="account" element={<Account />} />
    </Route>
  )
);

/**The entry point for adding a Router **/
/**Wrap <App /> with Provider */
/**Wrap <App /> with PersistGate under Provider */
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
