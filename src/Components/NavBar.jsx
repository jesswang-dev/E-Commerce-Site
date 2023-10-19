import { NavLink, Link } from "react-router-dom";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Featured from "../Pages/Featured";
import Recomended from "../Pages/Recomended";
import SearchBar from "./SearchBar";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Badge from "@mui/material/Badge";
import { displayCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const computedClassName = ({ isActive }) => {
    return isActive ? "active_" : "";
  };

  const dispatch = useDispatch();

  const displayShoppingCart = () => {
    dispatch(displayCart(true));
  };

  const itemAmount = useSelector((state) => state.cart.amount);

  return (
    <>
      <Container maxWidth={"xl"}>
        <Grid container height={100} alignItems="center">
          <Grid
            item
            xs={5}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <NavLink to="/" element={<Home />}>
              <img src="/logo.png" alt="Logo" height="50" />
            </NavLink>
            <NavLink to="/" element={<Home />} className={computedClassName}>
              Home
            </NavLink>
            <NavLink
              to="/shop"
              element={<Shop />}
              className={computedClassName}
            >
              Shop
            </NavLink>
            <NavLink
              to="/featured"
              element={<Featured />}
              className={computedClassName}
            >
              Featured
            </NavLink>
            <NavLink
              to="/recommended"
              element={<Recomended />}
              className={computedClassName}
            >
              Recommended
            </NavLink>
          </Grid>

          <Grid
            item
            xs={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SearchBar />
            <div
              className="cart-btn"
              style={{ cursor: "pointer" }}
              onClick={displayShoppingCart}
            >
              <Badge color="warning" badgeContent={itemAmount} max={99}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 28 }} />
              </Badge>
            </div>
          </Grid>

          <Grid item xs={2}>
            <div className="sign-up-in">
              <Link to="/signup" element={<SignUp />}>
                <Button variant="contained">Sign Up</Button>
              </Link>
              <Link to="/login" element={<LogIn />}>
                <Button variant="outlined">Log In</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
