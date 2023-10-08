import { NavLink, Link } from "react-router-dom";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Featured from "../Pages/Featured";
import Recomended from "../Pages/Recomended";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";

export default function NavBar() {
  return (
    <>
      <div className="home-logo">NavLogo</div>
      <nav>
        <NavLink to="/" element={<Home />}>
          Home
        </NavLink>
        <NavLink to="/shop" element={<Shop />}>
          Shop
        </NavLink>
        <NavLink to="/featured" element={<Featured />}>
          Featured
        </NavLink>
        <NavLink to="/recommended" element={<Recomended />}>
          Recommended
        </NavLink>
      </nav>
      <div className="sign-up-in">
        <Link to="/signup" element={<SignUp />}>
          Sign Up
        </Link>
        <Link to="/signin" element={<SignIn />}>
          Sign In
        </Link>
      </div>
    </>
  );
}
