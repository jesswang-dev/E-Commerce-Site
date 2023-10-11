import { useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Banner() {
  const location = useLocation();
  const route = location.pathname;

  const bannerState = {
    "/": {
      title: "See everything with Clarity",
      style: "visible",
      imgURL: "/home-banner.png",
      alt: "women model with red glasses frame",
    },

    "/featured": {
      title: "Featured Products",
      style: "hidden",
      imgURL: "/feature-banner.png",
      alt: "men model with black glasses frame",
    },

    "/recommended": {
      title: "Recommended Products",
      style: "hidden",
      imgURL: "/recommended-banner.png",
      alt: "women model with black glasses frame",
    },
  };

  const { title, style, imgURL, alt } = bannerState[route];

  return (
    <div className="banner">
      <Container maxWidth={"xl"}>
        <Grid container height={300} display={"flex"} justifyContent={"center"} >
          <Grid item xs={6}>
            <div className="text">
              <h3>{title}</h3>
              <p className="brief" style={{ visibility: style }}>
                Buying eyewear should leave you happy and good-looking, with
                money in your pocket. Glasses, sunglasses, and contacts—we’ve
                got your eyes covered.
              </p>
              <button style={{ visibility: style }}>Shop now</button>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="pic">
              <img src={imgURL} alt={alt} height={300}/>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
