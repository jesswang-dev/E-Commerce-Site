import { useLocation, Link } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import { Button } from "@mui/material";


export default function AccountButtons() {
    const { pathname } = useLocation();
    if(pathname === '/login') {
      return (
        <Link to="/signup" element={<SignUp />}>
          <Button variant="contained">Sign Up</Button>
        </Link>
      );
    }
    else if(pathname === '/signup') {
      return (
        <Link to="/login" element={<LogIn />}>
          <Button variant="outlined">Log In</Button>
        </Link>
      );
    } else {
      return (
        <>
          <Link to="/signup" element={<SignUp />}>
            <Button variant="contained">Sign Up</Button>
          </Link>
          <Link to="/login" element={<LogIn />}>
            <Button variant="outlined">Log In</Button>
          </Link>
        </>
      );
    }
}
