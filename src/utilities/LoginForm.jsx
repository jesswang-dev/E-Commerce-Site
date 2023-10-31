import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import firebaseApp from "../service/firebaseConfig";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userSignIn } from "../store/user";
import { useDispatch } from "react-redux";
import { Box, Divider, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginForm() {
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);

    const inputEmail = emailRef.current.value;
    const inputPassword = passwordRef.current.value;

    //user sign in with email and password
    await signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        //Signned in
        const user = userCredential.user;
        // console.log(user);
        if (user) {
          // const {id, email, name} = getUserById(user.uid);
          getUserById(user.uid).then((data) => {
            const accountInfo = data[0];
            const id = Object.keys(accountInfo);
            const account = {
              id: id,
              email: accountInfo[id].email,
              name: accountInfo[id].name,
              createdAt: user.metadata.creationTime,
              lastSignIn: user.metadata.lastSignInTime,
            };
            dispatch(userSignIn(account));
            navigate("/");
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
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
        // console.log(token);

        const { uid, email, displayName, createdAt, lastLoginAt } = user;

           const account = {
             id: uid,
             email: email,
             name: displayName,
             createdAt: createdAt,
             lastSignIn: lastLoginAt,
           };
           dispatch(userSignIn(account));
           navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  const getUserById = async (id) => {
    const db = getFirestore(firebaseApp);
    const q = query(collection(db, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      result.push({[doc.id]: doc.data()});
    });
    return result;
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 800,
          height: 350,
          border: "1px solid #c5c5c5",
          padding: "10px",
        }}
      >
        <div className="login-content">
          <div className="login-main">
            <div className="title">Log in</div>

            <form action="#" id="loginForm" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="test@example.com"
                ref={emailRef}
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="password"
                ref={passwordRef}
              />
              <br />
              <input id="login" type="submit" value="Log in" />
            </form>
          </div>
          <div className="login-divider">
            <Divider orientation="vertical">Or</Divider>
          </div>
          <div className="login-provider">
            <Button variant="outlined" startIcon={<GoogleIcon />} onClick={googleLogin}>
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
          Do not have an account?
          <Link to="/signup">Sign Up</Link>
        </div>
      </Box>
    </>
  );
}
