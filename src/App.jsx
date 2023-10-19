import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import UserAccount from "./Components/UserAccount";
import ShoppingCart from "./Components/ShoppingCart";

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

      {/* <UserAccount /> */}
    </>
  );
}

export default App;
