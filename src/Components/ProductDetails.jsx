import { useEffect, useState } from "react";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import firebaseApp from "../service/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Button,
  Radio,
  ButtonBase,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToExisted } from "../store/cart";

export default function ProductDetails() {
  const db = getFirestore(firebaseApp);
  const params = useParams();
  const { productId } = params;

  const navigate = useNavigate();

  const [detail, setDetail] = useState({});
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [colorErr, setColorErr] = useState(false);
  const [sizeErr, setSizeErr] = useState(false);

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

  const handleSelectedSize = (e) => {
    setSelectedSize(e.target.value);
    setSizeErr(false);
  };

  const handleSelectedColor = (e) => {
    setSelectedColor(e.target.value);
    setColorErr(false);
  };

  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.cart.itemList);

  const addItemToCart = () => {
    /** set error state to make UI respond to empty input (color & size)*/
    let colorIsSelected = false;
    let sizeIsSelected = false;
    if (!selectedColor.length) {
      setColorErr(true);
    } else {
      colorIsSelected = true;
    }
    if (!selectedSize.length) {
      setSizeErr(true);
    } else {
      sizeIsSelected = true;
    }

    /** hasSameItem works to examine if the item already exits in cart
     * if the item is already in the cart, instead of adding a new item, add quantity only*/

    let hasSameItem = false;

    //only add to cart if user select both color and size
    if (colorIsSelected && sizeIsSelected) {
      const newItem = {
        id: detail.id,
        name: detail.name,
        price: detail.price,
        url: detail.imageUrl,
        size: selectedSize,
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
    }
  };

  const onClickNavigate = () => {
    navigate("/shop");
  };

  const handleSwitchImage = (url) => {
    setImageUrl(url);
  };

  return (
    <>
      <div className="product-details">
        <Container>
          <Button onClick={onClickNavigate} startIcon={<ArrowBackIcon />}>
            Back to Shop
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <ul className="gallery">
                {imageList.map((image) => {
                  return (
                    <ButtonBase
                      key={`image${image.id}`}
                      onClick={() => handleSwitchImage(image.url)}
                    >
                      <li>
                        <img src={image.url} alt={image.id} />
                      </li>
                    </ButtonBase>
                  );
                })}
              </ul>
            </Grid>

            <Grid item xs={4}>
              <div className="product-img">
                <img
                  src={imageUrl.length ? imageUrl : detail.imageUrl}
                  alt={detail.name}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <Card sx={{ maxWidth: 700, height: "100%" }}>
                <Box mt={2}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {detail.brand}
                    </Typography>
                    <Typography variant="h5">{detail.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {detail.description}
                    </Typography>
                    <Divider />
                    <Typography
                      sx={{ mt: 1 }}
                      variant="subtitle1"
                      color="text.secondary"
                    >
                      Frame Size
                    </Typography>
                    <FormControl sx={{ mt: 1 }} fullWidth error={sizeErr}>
                      <InputLabel id="select-size-label">
                        {" "}
                        Select Size{" "}
                      </InputLabel>
                      <Select
                        labelId="select-size-label"
                        id="select-size"
                        label="Lens Size"
                        defaultValue={selectedSize}
                        onChange={handleSelectedSize}
                      >
                        {sizeList.map((size, index) => {
                          return (
                            <MenuItem key={`size${index}${size}`} value={size}>
                              {`${size} mm`}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                    <FormControl
                      sx={{ mt: 2, ml: 1, minWidth: 150 }}
                      error={colorErr}
                    >
                      <FormLabel id="radio-buttons-group-label">
                        Color
                      </FormLabel>

                      <RadioGroup
                        row
                        aria-labelledby="radio-buttons-group-label"
                        name="radio-buttons-group"
                        defaultValue={selectedColor}
                        onChange={handleSelectedColor}
                      >
                        {colorList.map((color, index) => {
                          return (
                            <>
                              <FormControlLabel
                                key={`color-${index}`}
                                className="custom-radios"
                                value={color}
                                control={
                                  <Radio
                                    checkedIcon={
                                      <CheckIcon sx={{ color: "#fff" }} />
                                    }
                                    icon={<span></span>}
                                    sx={{
                                      position: "absolute",
                                      marginBottom: 1,
                                    }}
                                  />
                                }
                                label={
                                  <span
                                    className="color-label"
                                    style={{
                                      display: "inline-block",
                                      color: `#fff`,
                                      height: 40,
                                      width: 40,
                                      borderRadius: "50%",
                                      border: "2px solid #fff",
                                      boxShadow:
                                        "0 1px 3px 0 rgba(0, 0, 0, 0.3)",
                                      backgroundColor: color,
                                    }}
                                  ></span>
                                }
                              ></FormControlLabel>
                            </>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>

                    <Typography
                      variant="h5"
                      mt={3}
                    >{`$${detail.price}.00`}</Typography>
                    <Button variant={"contained"} onClick={addItemToCart}>
                      Add to Cart
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
