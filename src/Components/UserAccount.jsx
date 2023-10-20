import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../service/firebaseConfig";
import { userSignOut } from "../store/user";
// import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


export default function UserAccount() {
  const account = useSelector((state) => state.user.account);
  
  const dispatch = useDispatch();

  const accountSignOut = (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("user signed out");
        dispatch(userSignOut());
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  return (
    <>
      <p>Welcome {account.name} !</p>
      <p>View Profile</p>
      <button onClick={() => accountSignOut()}>Sign Out</button>
    </>
  );
}
