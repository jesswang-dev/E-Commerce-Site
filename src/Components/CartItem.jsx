import { useDispatch, useSelector } from "react-redux";
import { incrementItem, decrementItem, deleteItem } from "../store/cart";
import { Paper, Grid, ButtonBase, Stack, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CartItem(props) {
  // eslint-disable-next-line react/prop-types
  const { id, name, url, size, color, price } = props.item;
  const { index }  = props;
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
      variant="outlined"
        elevation={1}
        sx={{ margin: "auto", width: "100%", height: 110, flexGrow: 1 }}
      >
        <Grid
          container
          columns={16}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={1}>
            <div className="action">
              <ButtonBase
                id="increment"
                sx={{ width: 35, height: 55 }}
                onClick={() => dispatch(incrementItem(getItemPayload()))}
              >
                <AddIcon fontSize="18px" />
              </ButtonBase>
              <ButtonBase
                id="decrement"
                sx={{ width: 35, height: 50 }}
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
                style={{ maxWidth: 90, height: 100, objectFit: "contain" }}
              />
            </div>
          </Grid>

          <Grid item xs={7} justifySelf="center">
            <div className="info">
              <p className="name">{name}</p>
              <Stack direction="row" mt={1}>
                <Item variant="outlined">
                  Quantity <br />
                  {itemQuantity[key]}
                </Item>
                <Item variant="outlined">
                  Size <br />
                  {size}
                </Item>
                <Item variant="outlined">
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

          <Grid item xs={2}>
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
