import { NavLink } from "react-router-dom";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Featured from "../Pages/Featured";
import Recomended from "../Pages/Recomended";
import SearchBar from "./SearchBar";
import AccountButtons from "./AccountButtons";
import NavLinkMenu from "./NavLinkMenu";
import { Grid, Badge, IconButton, useMediaQuery } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
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

  //responsive, while min-width is under 900px
  const matches = useMediaQuery('(min-width:900px)');


  return (
    <>
      <Grid container height={100} alignItems="center">
        <Grid
          item
          md={6}
          sm={4}
          xs={4}
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <NavLink to="/" element={<Home />}>
            <img src="/logo.png" alt="Logo" height="50" />
          </NavLink>

          {matches ? (
            <div className="nav-link">
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
            </div>
          ) : (
            <NavLinkMenu />
          )}
        </Grid>

        <Grid
          item
          md={4}
          sm={4}
          xs={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <SearchBar />
          <IconButton onClick={displayShoppingCart} className="cart-btn">
            <Badge color="warning" badgeContent={itemAmount} max={99}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 28 }} />
            </Badge>
          </IconButton>
        </Grid>

        <Grid
          item
          md={2}
          sm={4}
          xs={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <div className="sign-up-in">
            <AccountButtons />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
