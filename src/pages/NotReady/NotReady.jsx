import React from "react";
import { Box, Typography, CardMedia } from "@mui/material";
import { useTheme } from "../../layout/LayoutComponent";

const NotReady = () => {
  const { isDarkTheme } = useTheme();
  return (
    <Box >
      <Typography variant="h3" textAlign={"center"} m={3}>
        <Typography variant="span" color={isDarkTheme ? "white" : "primary"}>
        This page is Coming soon...
        </Typography>
      </Typography>
      <CardMedia
        title="this page is in progress"
        component="img"
        alt="this page is in progress, it's Coming soon"
        image="/assets/imgs/PageProgress.png"
      />
    </Box>
  );
};

export default NotReady;