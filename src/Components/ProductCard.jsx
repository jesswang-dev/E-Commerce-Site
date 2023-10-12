import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from "../service/firebaseConfig";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function ProductCard() {
  const db = getFirestore(firebaseApp);

  const [productList, setProduct] = useState([]);

  const getAllProductData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      const { name, brand, price, image } = doc.data();
      const productInfo = {
        id: doc.id,
        name: name,
        brand: brand,
        price: price,
        image: image,
      };
      setProduct((prev) => [...prev, productInfo]);
    });
  };

  useEffect(() => {
    getAllProductData();
  }, []);

  return (
    <>
      <ul>
        {productList.map((item) => {
          return (
            <li key={item.id}>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.brand}
                    </Typography>
                    <Typography variant="body2">{`$${item.price}.00`}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small">Add to Cart</Button>
                </CardActions>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}
