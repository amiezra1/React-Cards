import { Box, Typography, ImageList, ImageListItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h4">404 Page Not Found!</Typography>
      <ImageList>
        <ImageListItem>
          <img
            src="/assets/imgs/robot.png"
            alt="page not found"
          />
        </ImageListItem>
      </ImageList>
      <NavLink to={ROUTES.HOME}>navigate to Home page</NavLink>
    </Box>
  );
};
export default NotFoundPage;
