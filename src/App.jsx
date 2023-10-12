import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import FeaturedProduct from "./Components/FeaturedProduct";
import RecommendedProduct from "./Components/RecommendedProduct";

function App() {
  return (
    <>
      <div id="nav">
        <NavBar />
      </div>
      <div id="page">
        <Outlet />
      </div>
    </>
  );
}

export default App;
