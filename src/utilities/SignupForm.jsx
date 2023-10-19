import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseApp from "../service/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

    //user sign up
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const userObj = {
        name: name,
        email: email,
        password: password,
        id: res.user.uid,
      };
      console.log("userObj", userObj);

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
      <div className="errorMessage">{error.code}</div>

      <form action="#" id="signup" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          onBlur={addUserName}
          ref={nameRef}
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
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          onBlur={addUserPassword}
          ref={passRef}
        />
        <br />
        <input type="submit" value="Sign up" />
      </form>

      <div className="LoginOrSignup">
        Already have an account?
        <Link to='/login'>Log In</Link>
      </div>
    </>
  );
}
