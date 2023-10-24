import SignupForm from "../utilities/SignupForm";
import { Container } from "@mui/material";
export default function SignUp() {
  return (
    <>
      <Container maxWidth="md" sx={{mt:20}}>
        <SignupForm />
      </Container>
    </>
  );
}
