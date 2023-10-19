import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../service/firebaseConfig";
import { MenuItem } from "@mui/material";

import { useSelector } from "react-redux";

const userSignOut = () => {
  const auth = getAuth(firebaseApp);
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signout successfully");
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });

}
export default function UserAccount() {
  const account = useSelector((state) => state.user.account);
  console.log(account);
  return (
    <>
      <div>UserAccount</div>
      <p>Welcome {account.name} !</p>
      <MenuItem>View Profile</MenuItem>
      <MenuItem onClick={userSignOut}>Sign Out</MenuItem>
    </>
  );
}
