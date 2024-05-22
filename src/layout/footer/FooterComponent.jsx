import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoIcon from "@mui/icons-material/Info";
import LoginContext from "../../store/loginContext";
import ROUTES from "../../routes/ROUTES";

const FooterComponent = () => {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const handleIconClick = (event, newValue) => {
    switch (newValue) {
      case "about":
        navigate(ROUTES.ABOUT);
        break;
      case "favorites":
        navigate(ROUTES.FAVORITE);
        break;
      case "My Cards":
        navigate(ROUTES.MYCARDS);
        break;
      default:
        break;
    }
  };
  return (
    <Paper
      elevation={4}
      sx={{
        mt: 2,position: "sticky", bottom: 0, left: 0, right: 0 
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          onClick={(event) => handleIconClick(event, "about")}
          id="about"
          label="About"
          icon={<InfoIcon />}
        />
       
        {login && (
          <BottomNavigationAction
            onClick={(event) => handleIconClick(event, "favorites")}
            id="favorites"
            label="Favorites"
            icon={<FavoriteBorderIcon />}
          />
        )}

        {login && login.isBusiness && (
          <BottomNavigationAction
            onClick={(event) => handleIconClick(event, "My Cards")}
            id="My Cards"
            label="My Cards"
            icon={<AccountBoxIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};
export default FooterComponent;
