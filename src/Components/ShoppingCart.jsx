import { useSelector, useDispatch } from "react-redux";
import { emptyCart, displayCart } from "../store/cart";
import CartItem from "./cartItem";
import { Button, Container } from "@mui/material";

export default function ShoppingCart() {
  const itemList = useSelector((state) => state.cart.itemList);
  const itemAmount = useSelector((state) => state.cart.amount);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const cartDisplay = useSelector((state) => state.cart.cartDisplay);
  // console.log("itemList", itemList);

  const dispatch = useDispatch();

  return (
    <>
      <div
        id="cart"
        className={cartDisplay ? "active" : "inactive"}
        style={{ backgroundColor: "#fff" }}
      >
        <Container>
          <div className="cartHeader">
            <h5>
              My Cart <span>&#40;{itemAmount} items&#41;</span>
            </h5>

            <div className="buttons">
              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(displayCart(false))}
              >
                Close
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(emptyCart())}
              >
                Empty Cart
              </Button>
            </div>
          </div>

          <div className="cartItems">
            {itemList.map((item, index) => {
              return (
                <CartItem
                  key={`${item.id}${item.color}${item.size}`}
                  item={item}
                  index={index}
                />
              );
            })}
          </div>
          <div className="cartSummary">
            <div className="subtotal">
              <p>Subtotal:</p>
              {`$${subtotal}.00`}
            </div>
            <div className="buttons">
              <Button variant="contained">Check out</Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
