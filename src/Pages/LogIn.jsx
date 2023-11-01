import LoginForm from "../utilities/LoginForm";
import { Container } from "@mui/material";
export default function LogIn() {
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <LoginForm />
      </Container>
    </>
  );
}
