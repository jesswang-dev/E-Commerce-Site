import { useDispatch, useSelector } from "react-redux";
import { incrementItem, decrementItem, deleteItem } from "../store/cart";
import { Paper, Grid, ButtonBase, Stack, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

const Item = styled(Card)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CartItem(props) {
  // eslint-disable-next-line react/prop-types
  const { id, name, url, size, color, price } = props.item;
  const index = props.index;
  const itemQuantity = useSelector((state) => state.cart.itemQuantity);
  const itemSubtotal = useSelector((state) => state.cart.itemSubtotal);

  const key = String(id + color + size);

  const dispatch = useDispatch();

  const getItemPayload = () => {
    return { key: key, price: price };
  };

  const getDeleteItemPayload = () => {
    return { key: key, index: index};
  }


  return (
    <>
      <Paper
        elevation={1}
        sx={{ margin: "auto", maxWidth: 550, height: 110, flexGrow: 1 }}
      >
        <Grid container columns={16} justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <div className="action">
              <ButtonBase
                id="increment"
                sx={{ width: 35, height: 50}}
                onClick={() => dispatch(incrementItem(getItemPayload()))}
              >
                <AddIcon fontSize="18px" />
              </ButtonBase>
              <ButtonBase
                id="decrement"
                sx={{ width: 35, height: 50}}
                disabled={itemQuantity[key] <= 1 ? true : false}
                onClick={() => dispatch(decrementItem(getItemPayload()))}
              >
                <RemoveIcon fontSize="18px" />
              </ButtonBase>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="img">
              <img
                src={url}
                alt={name}
                style={{ width: 90, height: 100, objectFit: "contain" }}
              />
            </div>
          </Grid>

          <Grid item xs={8} justifySelf="center">
            <div className="info">
              <p className="name">{name}</p>
              <Stack direction="row">
                <Item>
                  Quantity <br />
                  {itemQuantity[key]}
                </Item>
                <Item>
                  Size <br />
                  {size}
                </Item>
                <Item>
                  Color <br />
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: `${color}`,
                    }}
                  ></span>
                </Item>
              </Stack>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="price">
              <p className="price">{`$${itemSubtotal[key]}.00`}</p>
            </div>
          </Grid>

          <Grid item xs={1}>
            <div className="deleteItem">
              <ButtonBase
                onClick={() => dispatch(deleteItem(getDeleteItemPayload()))}
              >
                <CloseIcon />
              </ButtonBase>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
