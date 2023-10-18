import { useDispatch, useSelector } from "react-redux";
import { incrementItem, decrementItem, deleteItem } from "../store/cart";
export default function CartItem(props) {
  // eslint-disable-next-line react/prop-types
  const { id, name, url, size, color } = props.item;
  const index = props.index;
  const itemQuantity = useSelector((state) => state.cart.itemQuantity);
  const itemSubtotal = useSelector((state) => state.cart.itemSubtotal);

  const key = String(id + color + size);

  const dispatch = useDispatch();

  const getItemPayload = () => {
    return { key: key, price: price };
  };

  const getDeleteItemPayload = () => {
    return {key: key, index: index};
  }

  return (
    <>
      <div className="cardBox" style={{ border: "1px solid gray" }}>
        <div className="action">
          <button
            id="increment"
            onClick={() => dispatch(incrementItem(getItemPayload()))}
          >
            {" "}
            ++{" "}
          </button>
          <button
            id="decrement"
            disabled={itemQuantity[key] <= 1 ? true : false}
            onClick={() => dispatch(decrementItem(getItemPayload()))}
          >
            {" "}
            --{" "}
          </button>
        </div>
        <div className="img">
          <img src={url} alt={name} style={{ width: 150, height: 100 }} />
        </div>
        <div className="info">
          <p className="name">{name}</p>
          <p className="quantity">Quantity: {itemQuantity[key]}</p>
          <p className="size">Size: {size}</p>
          <p className="color">
            Color:{" "}
            <span
              style={{
                display: "inline-block",
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: `${color}`,
              }}
            ></span>
          </p>
        </div>

        <div className="price">
          <p className="price">{`$${itemSubtotal[key]}.00`}</p>
        </div>

        <div className="deleteItem">
          <button onClick={() => dispatch(deleteItem(getDeleteItemPayload()))}>Delete</button>
        </div>
      </div>
    </>
  );
}
