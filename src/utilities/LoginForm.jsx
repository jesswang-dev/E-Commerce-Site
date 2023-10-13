import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../service/firebaseConfig";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);

    const inputEmail = emailRef.current.value;
    const inputPassword = passwordRef.current.value;
    try {
      const res = signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      console.log(res.user, "success");
      navigate("/")
    } catch (error) {
      console.error(error);
    }

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
