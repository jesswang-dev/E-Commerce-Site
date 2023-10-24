// import { useNavigate } from "react-router-dom";
import UserProfile from "../Components/UserProfile";
import { useSelector } from "react-redux";
import LoginForm from "../utilities/LoginForm";

export default function Account() {
  const isSignnedIn = useSelector((state) => state.user.isSignnedIn);
  // const navigate = useNavigate();

  if (isSignnedIn) {
    return <UserProfile />;
  } else {
    return <LoginForm />;
  }
}
