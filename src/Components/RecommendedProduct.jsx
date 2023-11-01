import firebaseApp from "../service/firebaseConfig";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

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

  const navigate = useNavigate();

  const navigateToDetails = (i) => {
    const productId = productList[i].id;
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className="recommended-product">
        <div className="title">
          <Typography variant="h5" gutterBottom>
            Recommended Products
          </Typography>
        </div>

        <div className="product-content">
          <Grid container justifyContent="flex start">
            {productList.map((item, index) => {
              return (
                <Grid item
                xs={3}
                  key={item.id}
                  onClick={() => {
                    navigateToDetails(index);
                  }}
                  mb={3}
                >
                  <Card sx={{ maxWidth: 320 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="150"
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
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </>
  );
}
