import { useLocation, Link } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import UserAccount from "./UserAccount";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function AccountButtons() {
  const isSignnedIn = useSelector((state) => state.user.isSignnedIn);
  const { pathname } = useLocation();
  
  if (isSignnedIn) {
    return (<UserAccount />);
  } else {
    if (pathname === "/login") {
      return (
        <Link to="/signup" element={<SignUp />}>
          <Button variant="contained">Sign Up</Button>
        </Link>
      );
    } else if (pathname === "/signup") {
      return (
        <Link to="/login" element={<LogIn />}>
          <Button variant="outlined">Log In</Button>
        </Link>
      );
    } else {
      return (
        <>
          <Link to="/signup" element={<SignUp />}>
            <Button variant="contained" size="small">
              Sign Up
            </Button>
          </Link>
          <Link to="/login" element={<LogIn />}>
            <Button variant="outlined" size="small">
              Log In
            </Button>
          </Link>
        </>
      );
    }
  }
}
