import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./Pages/error-page";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Featured from "./Pages/Featured";
import Recomended from "./Pages/Recomended";
import Result from "./Pages/Result";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";

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
    </Route>
  )
);

/**The entry point for adding a Router **/
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
