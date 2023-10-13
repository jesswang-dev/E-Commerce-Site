import firebaseApp from "../service/firebaseConfig";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
<<<<<<< HEAD
import { CardActionArea, Grid, Container} from "@mui/material";
=======
import { CardActionArea } from "@mui/material";
>>>>>>> 3371743847e5c960ffb095d2d57562e0c0a7500f

export default function RecommendedProduct() {
  const db = getFirestore(firebaseApp);

  const [productList, setProductList] = useState([]);

  const getRecommendedProdcuts = async () => {
    const q = query(
      collection(db, "products"),
      where("isRecommended", "==", true)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());

      const { name, brand, image } = doc.data();
      const productInfo = {
        id: doc.id,
        name: name,
        brand: brand,
        image: image,
      };
      setProductList((prev) => [...prev, productInfo]);
    });
  };

  useEffect(() => {
    getRecommendedProdcuts();
  }, []);

  console.log('recommended', productList);
  return (
    <>
<<<<<<< HEAD
      <Container>
        <Grid sx={{ maxWidth: 1200 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="flex start" spacing={2}>
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
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </li>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
=======
      <ul>
        {
        productList.map((item) => {
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
                  </CardContent>
                </CardActionArea>
              </Card>
            </li>
          );
        })}
      </ul>
>>>>>>> 3371743847e5c960ffb095d2d57562e0c0a7500f
    </>
  );
}
