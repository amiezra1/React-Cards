import { Box } from "@mui/material";
import {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  bizLinks,
  adminLinks,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useContext } from "react";
import LoginContext from "../../../store/loginContext";

const Links = () => {
  const { login } = useContext(LoginContext);
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {alwaysLinks.map((myItem, index) => (
        <NavLinkComponent to={myItem.to} key={"linksnav" + index}>
          {myItem.children}
        </NavLinkComponent>
      ))}
      {login &&
        loggedInLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav2" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {login &&
        login.isBusiness &&
        bizLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav2" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {login &&
        login.isBusiness &&
        login.isAdmin &&
        adminLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav2" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {!login &&
        loggedOutLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav3" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
    </Box>
  );
};
export default Links;
