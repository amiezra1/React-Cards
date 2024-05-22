import { useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Menu
} from "@mui/material";
import LoginContext from "../../../store/loginContext.js";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const handleListClick = (text) => {
    // CRMsystem
    const link = text.split(" ").join("").toUpperCase();
    navigate(ROUTES[link]);
  };
  return (
    <Menu aria-labelledby="demo-positioned-button" open={isOpen} onClose={onCloseDrawer}  
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}>
      <Box
        sx={{ width: { auto: 250 } }}
        role="presentation"
        onClick={onCloseDrawer}
        onKeyDown={onCloseDrawer}
      >
        <List>
          {["Home", "About"].map((text, index) => (
            <ListItem key={text + index} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={text}
                  onClick={() => handleListClick(text)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {!login && (
          <List>
            {["Register", "Login"].map((text, index) => (
              <ListItem key={text + index} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={text}
                    onClick={() => handleListClick(text)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        <Divider />
        {login && (
          <List>
            {["Favorite"].map((text, index) => (
              <ListItem key={text + index} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={text}
                    onClick={() => handleListClick(text)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        <Divider />
        {login && login.isBusiness && (
          <List>
            {["Create Card", "My Cards"].map((text, index) => (
              <ListItem key={text + index} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={text}
                    onClick={() => handleListClick(text)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        <Divider />
        {login && login.isBusiness && login.isAdmin && (
          <List>
            {["Page not ready"].map((text, index) => (
              <ListItem key={text + index} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={"CRM system"}
                    onClick={() => handleListClick(text)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Menu>
  );
};
export default LeftDrawerComponent;
