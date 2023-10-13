import Banner from "../Components/Banner";
import FeaturedProduct from "../Components/FeaturedProduct";
import RecommendedProduct from "../Components/RecommendedProduct";
import { Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Banner />
      <Container maxWidth="xl">
        <Typography variant="h5" mb={5} mt={5}>
          Featured Products
        </Typography>
        <FeaturedProduct />
      </Container>

      <Container maxWidth="xl">
        <Typography variant="h5" mb={5}>
          Recommended Products
        </Typography>
        <RecommendedProduct />
      </Container>
    </>
  );
}
