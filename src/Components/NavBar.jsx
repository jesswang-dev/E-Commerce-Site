import { NavLink, Link } from "react-router-dom";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Featured from "../Pages/Featured";
import Recomended from "../Pages/Recomended";
import SearchBar from "./SearchBar";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

export default function NavBar() {

  function computedClassName({isActive}) {
    return isActive?'active_':''
  }
  return (
    <>
      <Container maxWidth={'xl'}>
        <Grid container height={100} display={"flex"} alignItems={"center"}>
          <Grid
            item
            xs={5}
            display={"flex"}
            justifyContent={"space-evenly"}
          >
            <NavLink to="/" element={<Home />}>
              Logo
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

          <Grid item xs={5}>
            <SearchBar />
          </Grid>

          <Grid
            item
            xs={2}
            // display={"flex"}
            // justifyContent={"space-around"}
          >
            <div className="sign-up-in">
              <Link to="/signup" element={<SignUp />}>
                <Button variant="contained">Sign Up</Button>
              </Link>
              <Link to="/signin" element={<SignIn />}>
                <Button variant="outlined">Sign In</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
