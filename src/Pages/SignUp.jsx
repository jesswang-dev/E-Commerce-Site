import SignupForm from "../Components/SignupForm";
import { Container } from "@mui/material";
export default function SignUp() {
  return (
    <>
      <Container maxWidth="md" sx={{ mt:10 }}>
        <SignupForm />
      </Container>
    </>
  );
}
