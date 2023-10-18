export default function CartItem(props) {

  // eslint-disable-next-line react/prop-types
  const { id, name, url, price, size, color, quantity } = props.item;

  return (
    <>
      <div className="cardBox" style={{border: "1px solid gray"}}>
        <div className="action">
          <button> ++ </button>
          <button> -- </button>
        </div>
        <div className="img">
          <img src={url} alt={name} style={{width: 150, height:100}}/>
        </div>
        <div className="info">
          <p className="name">{name}</p>
          <p className="quantity">Quantity:{quantity}</p>
          <p className="size">Size:{size}</p>
          <p className="color">Color:{color}</p>
        </div>

        <div className="price">
            <p className="price">{price}</p>
        </div>

        <div className="deleteItem">
            <button>Delete</button>
        </div>
      </div>
    </>
  );
}
