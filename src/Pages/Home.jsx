import Banner from "../Components/Banner";
import FeaturedProduct from "../Components/FeaturedProduct";
import RecommendedProduct from "../Components/RecommendedProduct";
export default function Home() {
  return (
    <>
      <Banner />
      <div className="featured">
        <h2>Featured Products</h2>
        <FeaturedProduct />
      </div>
      <div className="recommended">
        <h2>Recommended Products</h2>
        <RecommendedProduct />
      </div>
    </>
  );
}
