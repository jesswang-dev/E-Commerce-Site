import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignIn } from "../store/user";
import { useDispatch } from "react-redux";
import firebaseApp from "../service/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Box, Divider, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignupForm() {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        address: null,
        tel: null,
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

  const googleLogin = async () => {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(`token: ${token}`);

        const { uid, email, displayName, metadata } = user;
        const account = {
          id: uid,
          email: email,
          name: displayName,
          createdAt: metadata.creationTime,
          lastSignIn: metadata.lastSignInTime,
        };

        dispatch(userSignIn(account));
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setError((prev) => ({
          ...prev,
          code: errorCode,
          message: errorMessage,
        }));
      });
  };

  return (
    <>
      <div className="errorMessage" style={{ height: 50 }}>
        {error.code}
      </div>
      <Box
        sx={{
          maxWidth: 800,
          height: 400,
          border: "1px solid #c5c5c5",
          padding: "10px",
        }}
      >
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
          <div className="auth-provider">
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={googleLogin}
            >
              Continue with Google
            </Button>
          </div>
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
