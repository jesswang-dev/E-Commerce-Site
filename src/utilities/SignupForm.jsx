import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseApp from "../service/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Box, Divider } from "@mui/material";

export default function SignupForm() {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const addUserName = () => {
    setName(nameRef.current.value);
  };
  const addUserEmail = () => {
    setEmail(emailRef.current.value);
  };
  const addUserPassword = () => {
    setPassword(passRef.current.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //user sign up with email and password
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const userObj = {
        name: name,
        email: email,
        password: password,
        id: res.user.uid,
      };
      // console.log("userObj", userObj);

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "users"), userObj);
      console.log("Document written with ID: ", docRef.id);

      //sign up - success - navigate to root directory
      navigate("/");
    } catch (error) {
      console.error(error);
      setError((prev) => ({
        ...prev,
        code: error.code,
        message: error.message,
      }));
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 800,
          height: 400,
          border: "1px solid #c5c5c5",
          padding: "10px",
        }}
      >
        <div className="errorMessage">{error.code}</div>

        <div className="auth-content">
          <div className="auth-main">
            <div className="title">Sign up</div>

            <form id="signupForm" onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <br />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                onBlur={addUserName}
                ref={nameRef}
                required
              />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="test@example.com"
                onBlur={addUserEmail}
                ref={emailRef}
                required
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="&nbsp;password"
                onBlur={addUserPassword}
                ref={passRef}
                required
              />
              <br />
              <input id="signup" type="submit" value="Sign up" />
            </form>
          </div>
          <div className="auth-divider">
            <Divider orientation="vertical">Or</Divider>
          </div>
          <div className="auth-provider"></div>
        </div>
      </Box>

      <Box
        sx={{
          maxWidth: 800,
          height: 60,
          border: "1px solid #c5c5c5",
          borderTop: "none",
        }}
      >
        <div className="LoginOrSignup">
          Already have an account?
          <Link to="/login"> Log In </Link>
        </div>
      </Box>
    </>
  );
}
