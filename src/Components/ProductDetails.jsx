import { useEffect, useState, useRef } from "react";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import firebaseApp from "../service/firebaseConfig";
import { Link, useParams } from "react-router-dom";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToExisted } from "../store/cart";
export default function ProductDetails() {
  const db = getFirestore(firebaseApp);
  const params = useParams();
  const { productId } = params;

  const [detail, setDetail] = useState({});
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  const getProductById = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      const {
        name,
        brand,
        description,
        price,
        sizes,
        availableColors,
        image,
        imageCollection,
      } = data;

      setDetail((prev) => ({
        ...prev,
        id: productId,
        name: name,
        brand: brand,
        description: description,
        price: price,
        imageUrl: image,
      }));

      setSizeList((prev) => [...prev, ...sizes]);
      setColorList((prev) => [...prev, ...availableColors]);
      setImageList((prev) => [...prev, ...imageCollection]);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getProductById(productId);
  }, []);

  const sizeRef = useRef();
  // const colorRef = useRef();

  const getSelectedSize = () => {
    return sizeRef.current.value;
  };

  const handleSelectedColor = (e) => {
    setSelectedColor(e.target.value);
  };

  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.cart.itemList);

  const addItemToCart = () => {
    //if the item is already in the cart, instead of adding a new item add quantity only
    let hasSameItem = false;

    const newItem = {
      id: detail.id,
      name: detail.name,
      price: detail.price,
      url: detail.imageUrl,
      size: getSelectedSize(),
      color: selectedColor,
    };

    for (let i = 0; i < itemList.length; i++) {
      const item = itemList[i];
      if (
        item.id === newItem.id &&
        item.size === newItem.size &&
        item.color === newItem.color
      ) {
        hasSameItem = true;
        break;
      }
    }

    if (hasSameItem) {
      dispatch(addToExisted(newItem));
    } else {
      dispatch(addToCart(newItem));
    }
  };

  return (
    <>
      <Container>
        <Link to={"/shop"}>
          <ArrowBackIcon />
          Back to Shop
        </Link>
        <Grid
          container
          sx={{
            maxWidth: 1100,
            height: 500,
            border: "1px solid #f9f9f9",
          }}
          spacing={3}
        >
          <Grid item xs={2} sx={{ display: "flex", direction: "column" }}>
            <ul
              className="gallery"
              style={{
                width: 100,
                height: "100%",
                border: "1px solid #f9f9f9",
              }}
            >
              {imageList.map((image) => {
                return (
                  <li
                    key={image.id}
                    style={{
                      width: 100,
                      height: 100,
                      border: "1px solid #f9f9f9",
                    }}
                  >
                    <img
                      src={image.url}
                      alt={image.id}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </Grid>

          <Grid item xs={4}>
            <Card
              sx={{
                maxWidth: "100%",
                height: "100%",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div className="product">
                <img
                  src={detail.imageUrl}
                  alt={detail.name}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card sx={{ maxWidth: 700, height: "100%" }}>
              <Box mt={3}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {detail.brand}
                  </Typography>
                  <Typography variant="h5">{detail.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {detail.description}
                  </Typography>
                </CardContent>
                <select ref={sizeRef}>
                  {sizeList.map((size, index) => {
                    return (
                      <option key={index} value={size}>
                        {`${size} mm`}
                      </option>
                    );
                  })}
                </select>

                <ul className="color">
                  {colorList.map((color, index) => {
                    return (
                      <li key={`color${index}-${color}`}>
                        <input
                          type="radio"
                          id={`color${index}`}
                          name="color"
                          value={color}
                          onChange={handleSelectedColor}
                          // ref={colorRef}
                        />
                        <label
                          htmlFor={`color${index}`}
                          style={{
                            color: `#fff`,
                            height: 50,
                            width: 100,
                            backgroundColor: `${color}`,
                          }}
                        >
                          {color}
                        </label>
                      </li>
                    );
                  })}
                </ul>

                <p className="price">{detail.price}</p>
                <button onClick={addItemToCart}>Add to Cart</button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
