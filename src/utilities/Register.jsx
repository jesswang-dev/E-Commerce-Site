import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../service/firebaseConfig";
import { useRef } from "react";

export default function Register() {
  const passwordRef = useRef();
  const emailRef = useRef();

  const auth = getAuth(firebaseApp);

    const handleClick = (e) => {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // ...
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage);
          });
    }



  return (
    <>
      <div>Register</div>
      <form action="#">
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          ref={passwordRef}
        />
        <button onClick={handleClick}>register</button>
      </form>
    </>
  );
}
