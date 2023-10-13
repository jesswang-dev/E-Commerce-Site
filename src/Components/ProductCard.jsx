import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from "../service/firebaseConfig";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
<<<<<<< HEAD
import { Button, CardActionArea, CardActions, Grid, Container} from "@mui/material";
=======
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
>>>>>>> 3371743847e5c960ffb095d2d57562e0c0a7500f

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
<<<<<<< HEAD
      <Container>
        <Grid sx={{ maxWidth: 1200 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              {productList.map((item) => {
                return (
                  <Grid key={item.id} item>
                    <Card sx={{ maxWidth: 200 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="100"
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
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
=======
      <Grid sx={{ maxWidth: 1200 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {productList.map((item) => {
              return (
                <Grid key={item.id} item>
                  <Card sx={{ maxWidth: 200 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
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
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
>>>>>>> 3371743847e5c960ffb095d2d57562e0c0a7500f
    </>
  );
}
