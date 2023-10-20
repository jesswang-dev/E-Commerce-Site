import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import ShoppingCart from "./Components/ShoppingCart";
// import UserAccount from "./Components/UserAccount";
// import TestAccount from "./Components/TestAccount";

function App() {
  return (
    <>
      <div id="nav">
        <NavBar />
      </div>
      <div id="page">
        <Outlet />
      </div>
      <ShoppingCart />
    </>
  );
}

export default App;
