import { Avatar, IconButton } from "@mui/material";
import React from "react";
import NavLinkComponent from "../NavLinkComponent";
import ROUTES from "../../../routes/ROUTES";

export default function LogoIcon() {
  return (
    <>
      <NavLinkComponent to={ROUTES.ROOT}>
        <IconButton>
          <Avatar
            src="/assets/imgs/business-card.png"
            alt="Business card icon"
          />
        </IconButton>
      </NavLinkComponent>
    </>
  );
}
