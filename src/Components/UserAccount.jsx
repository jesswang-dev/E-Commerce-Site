import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../service/firebaseConfig";
import { userSignOut } from "../store/user";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

/** for Avatar styling, generate background color */
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

const getFirstName = (name) => {
  return name.split(" ")[0];
};

export default function TestAccount() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
      <span>{getFirstName(account.name)}</span>
      <IconButton onClick={handleClick}>
        <Avatar {...stringAvatar(account.name)} />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />{" "}
          </ListItemIcon>
          My Account
        </MenuItem>
        <MenuItem onClick={accountSignOut}>
          {" "}
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
