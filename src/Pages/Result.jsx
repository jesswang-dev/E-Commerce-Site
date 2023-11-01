import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import firebaseApp from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteItem } from "../store/cart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Container,
  styled,
  Paper
} from "@mui/material";

export default function Result() {
  const { input } = useParams();
  const db = getFirestore(firebaseApp);

  const [productList, setProduct] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [defaultColors, setDefaultColor] = useState([]);
  const [defaultSizes, setDefaultSize] = useState([]);

  const getAllProductData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      // console.log(doc.data());
      const { name, brand, price, image, availableColors, sizes } = doc.data();
      const productInfo = {
        id: doc.id,
        name: name,
        brand: brand,
        price: price,
        image: image,
      };
      setProduct((prev) => [...prev, productInfo]);
      setDefaultColor((prev) => [...prev, availableColors[0]]);
      setDefaultSize((prev) => [...prev, sizes[0]]);
      // console.log(`input: ${input}`)
      if(name.toLowerCase().includes(input) || brand.toLowerCase().includes(input)) {
        setFilteredList((prev) => [...prev, productInfo]);
      }

    });
  };


  useEffect(() => {
    getAllProductData();
  }, [input]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.cart.itemList);

  const navigateToDetails = (i) => {
    const productId = productList[i].id;
    navigate(`/product/${productId}`);
  };

  const alreadyInCart = (i) => {
    const { id } = productList[i];
    const color = defaultColors[i];
    const size = defaultSizes[i];

    for (let i = 0; i < itemList.length; i++) {
      const item = itemList[i];
      if (item.id === id && item.color === color && item.size === size) {
        return true;
      }
    }
    return false;
  };

  const addDefaultItemToCart = (i) => {
    const { id, name, price, image } = productList[i];
    const newItem = {
      id: id,
      name: name,
      price: price,
      url: image,
      size: defaultSizes[i],
      color: defaultColors[i],
    };

    dispatch(addToCart(newItem));
  };

  const removeDefaultItemFromCart = (i) => {
    const { id } = productList[i];
    const color = defaultColors[i];
    const size = defaultSizes[i];
    const key = String(id + color + size);
    let index;

    for (let i = 0; i < itemList.length; i++) {
      const item = itemList[i];
      if (item.id === id && item.color === color && item.size === size) {
        index = i;
      }
    }

    dispatch(deleteItem({ key: key, index: index }));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.h5,
    padding: theme.spacing(1),
    textAlign: "center",
    height: 700,
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Container>
        <Grid sx={{ maxWidth: 1200 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              {filteredList.length === 0 ? (
                <Grid item xs={12}>
                  <Item>No product found</Item>
                </Grid>
              ) : (
                filteredList.map((item, index) => {
                  return (
                    <Grid key={item.id} item>
                      <Card sx={{ maxWidth: 200 }}>
                        <CardActionArea
                          onClick={() => {
                            navigateToDetails(index);
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="100"
                            image={item.image}
                            alt={item.name}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.brand}
                            </Typography>
                            <Typography variant="body2">{`$${item.price}.00`}</Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          {alreadyInCart(index) ? (
                            <Button
                              size="samll"
                              onClick={() => removeDefaultItemFromCart(index)}
                            >
                              Remove from Cart
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              onClick={() => addDefaultItemToCart(index)}
                            >
                              Add to Cart
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
