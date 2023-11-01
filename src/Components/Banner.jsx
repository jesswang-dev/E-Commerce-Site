import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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

  const navigate = useNavigate();
  const onClickNavigate = () => {
    navigate("/shop");
  }

  return (
    <>
      <div className="banner">
        <Grid container>
          <div className="text">
            <Typography variant="h3" gutterBottom>
              {title}
            </Typography>
            <p className="brief" style={{ visibility: style }}>
              <Typography variant="body2" gutterBottom>
                Buying eyewear should leave you happy and good-looking, with
                money in your pocket. Glasses, sunglasses, and contacts—we’ve
                got your eyes covered.
              </Typography>
            </p>
            
              <Button
                sx={{ visibility: style }}
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={onClickNavigate}
              >
                Shop now
              </Button>
          </div>

          <div className="pic">
            <img src={imgURL} alt={alt} />
          </div>
        </Grid>
      </div>
    </>
  );
}
