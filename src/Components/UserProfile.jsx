import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userEditAddress, userEditPhone } from "../store/user";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import firebaseApp from "../service/firebaseConfig";

import {
  Box,
  Tab,
  Avatar,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Container,
} from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";

export default function UserProfile() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const account = useSelector((state) => state.user.account);
  const { id, name, email, address, tel, createdAt } = account;
  // console.log(id[0]);

  const getFormattedDate = (timeData) => {
    const dateStr = new Date(timeData).toUTCString();
    const date = dateStr.split(" ");
    return `${date[2]} ${date[1]}, ${date[3]}`;
  };

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

  const [onEdit, setOnEdit] = useState(false);
  const [newAddress, setNewAddress] = useState(address);
  const [newTel, setNewTel] = useState(tel);

  const onClickEdit = () => {
    setOnEdit(true);
  };

  const dispatch = useDispatch();

  const onClickSaveChanges = () => {
    //update the new input address and phone number into database
    writeUserData(id[0], newAddress, newTel);

    //update the data in redux user store
    dispatch(userEditAddress(newAddress));
    dispatch(userEditPhone(newTel));
    setOnEdit(false);
  };

  const onChangeNewAddress = (e) => {
    setNewAddress(e.target.value);
  };

  const onChangeNewTel = (e) => {
    setNewTel(e.target.value);
  };

  async function writeUserData(userId, address, tel) {
    const db = getFirestore(firebaseApp);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      address: address,
      tel: tel,
    });
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: 700,
          height: 700,
          border: "1px solid #c5c5c5",
          padding: "10px",
        }}
      >
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            centered
          >
            <Tab value="1" label="Account" />
            <Tab value="2" label="Order History" />
            <Tab value="3" label="Wish List" />
          </TabList>
          <Box sx={{ width: "100%" }}>
            <TabPanel value="1">
              <div className="account">
                <Card sx={{ maxWidth: "100%", height: 600 }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image="/account-default-bkg.jpg"
                    alt="default background picture"
                  />
                  <div className="profileHeader">
                    <Container
                      sx={{
                        width: 600,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Avatar {...stringAvatar(name)} />
                      <Button variant="contained" onClick={onClickEdit}>
                        Edit Profile
                      </Button>
                    </Container>
                  </div>

                  <CardContent sx={{ padding: 5 }}>
                    <Typography variant="h6" component="div">
                      {name}
                    </Typography>

                    <Typography variant="subtitle1" component="div">
                      Email
                    </Typography>
                    <TextField
                      hiddenLabel
                      defaultValue={email}
                      id="profile-email"
                      type="email"
                      variant="standard"
                      size="small"
                      disabled={true}
                    />
                    <Typography variant="subtitle1" component="div">
                      Address
                    </Typography>
                    <TextField
                      hiddenLabel
                      defaultValue={
                        newAddress ? newAddress : "No address info recorded"
                      }
                      id="profile-address"
                      variant="standard"
                      size="small"
                      onChange={onChangeNewAddress}
                      disabled={onEdit ? false : true}
                      sx={{ width: "50%" }}
                    />

                    <Typography variant="subtitle1" component="div">
                      Phone
                    </Typography>
                    <TextField
                      hiddenLabel
                      defaultValue={
                        newTel ? newTel : "No phone number recorded"
                      }
                      id="profile-tel"
                      variant="standard"
                      type="tel"
                      size="small"
                      onChange={onChangeNewTel}
                      disabled={onEdit ? false : true}
                      sx={{ width: "50%" }}
                    />
                    <Typography variant="subtitle1" component="div">
                      Date joined
                    </Typography>
                    <TextField
                      hiddenLabel
                      defaultValue={getFormattedDate(createdAt)}
                      id="profile-date-joined"
                      variant="standard"
                      size="small"
                      disabled={true}
                    />
                  </CardContent>
                  <div className="save-changes">
                    {onEdit ? (
                      <Button variant="contained" onClick={onClickSaveChanges}>
                        Save Changes
                      </Button>
                    ) : null}
                  </div>
                </Card>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="order-history">No Data History :&#40;</div>
            </TabPanel>
            <TabPanel value="3">
              <div className="wish-list"> No Data History :&#40;</div>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </>
  );
}
