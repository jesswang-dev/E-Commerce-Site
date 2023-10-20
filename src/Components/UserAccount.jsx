import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../service/firebaseConfig";
import { userSignOut } from "../store/user";
import { Avatar, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}


export default function UserAccount() {
  const account = useSelector((state) => state.user.account);
  
  const dispatch = useDispatch();

  const accountSignOut = () => {
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
      <Avatar {...stringAvatar(account.name)} />
      <button onClick={accountSignOut}>Sign Out</button>
    </>
  );
}
