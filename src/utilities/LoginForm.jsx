import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
import { signIn } from "../store/user";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);

    const inputEmail = emailRef.current.value;
    const inputPassword = passwordRef.current.value;

    await signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        //Signned in
        const user = userCredential.user;
        console.log(user);
        if (user) {
          // const {id, email, name} = getUserById(user.uid);
          getUserById(user.uid).then((data) => {
            const account = {
              id: data[0].id,
              email: data[0].email,
              name: data[0].name,
              createdAt: user.metadata.creationTime,
              lastSignIn: user.metadata.lastSignInTime,
            };
            dispatch(signIn(account));
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

  const getUserById = async (id) => {
    const db = getFirestore(firebaseApp);
    const q = query(collection(db, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      result.push(doc.data());
    });
    return result;
  };

  return (
    <>
      <form action="#" id="login">
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
        <button onClick={handleClick}>Log In</button>
      </form>

      <div className="LoginOrSignup">
        Do not have an account?
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
