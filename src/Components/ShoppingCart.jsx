import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../store/cart";
import CartItem from "./cartItem";

export default function ShoppingCart() {
  const itemList = useSelector((state) => state.cart.itemList);
  const itemAmount = useSelector((state) => state.cart.amount);
  const subtotal = useSelector((state) => state.cart.subtotal);
  console.log("itemList", itemList);

  const dispatch = useDispatch();

  return (
    <>
      <div className="container" style={{ width: 500, height: 2000}}>
        <div className="header">
          <h5>
            My Cart <span>&#40;{itemAmount} items&#41;</span>
          </h5>
          <button>Close</button>
          <button onClick={() => dispatch(emptyCart())}>Empty Cart</button>
        </div>

        <div className="cartItems" style={{ width: 500, height: 250 }}>
          {itemList.map((item, index) => {
            
            return (
            <CartItem key={`${item.id}${item.color}${item.size}`} item={item} index={index}/>
            )
          })}
        </div>
        <hr></hr>
        <div className="cartSummary">
          <p>Subtotal: </p>
          <div className="subtotal">{`$${subtotal}.00`}</div>
          <button>Check out</button>
        </div>
      </div>
    </>
  );
}
