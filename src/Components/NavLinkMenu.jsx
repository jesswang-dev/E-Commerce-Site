import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StarsIcon from "@mui/icons-material/Stars";
import RecommendIcon from "@mui/icons-material/Recommend";

export default function NavLinkMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToShop = () => {
    navigate("/shop");
  };
  const navigateToFeat = () => {
    navigate("/featured");
  };
  const navigateToReco = () => {
    navigate("/recommended");
  }

  return (
    <div className="navlink-menu">
      <Button
        id="basic-button"
        aria-controls={open ? "navlink-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="navlink-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={navigateToHome}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <MenuItem onClick={navigateToShop}>
          <ListItemIcon>
            <LocalMallIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Shop</ListItemText>
        </MenuItem>
        <MenuItem onClick={navigateToFeat}>
          <ListItemIcon>
            <StarsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Featured</ListItemText>
        </MenuItem>
        <MenuItem onClick={navigateToReco}>
          <ListItemIcon>
            <RecommendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Recommended</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
