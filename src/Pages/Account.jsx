// import { useNavigate } from "react-router-dom";
import UserProfile from "../Components/UserProfile";
import { useSelector } from "react-redux";
import LoginForm from "../Components/LoginForm";
import { Container } from "@mui/material";

export default function Account() {
  const isSignnedIn = useSelector((state) => state.user.isSignnedIn);
  // const navigate = useNavigate();

  if (isSignnedIn) {
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <UserProfile />
      </Container>
    );
  } else {
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <LoginForm />
      </Container>
    );
  }
}
