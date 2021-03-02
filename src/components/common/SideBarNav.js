import React from "react";
import { MenuItem, MenuList, Paper } from "@material-ui/core";
import { NavLink, useRouteMatch } from "react-router-dom";

function SideBarNav() {
  const { path } = useRouteMatch();

  return (
    <Paper>
      <MenuList>
        <MenuItem component={NavLink} to={path + "/appetizers"}>
          Appetizers
        </MenuItem>
        <MenuItem component={NavLink} to={path + "/soups"}>
          Soups
        </MenuItem>
        <MenuItem component={NavLink} to={path + "/main"}>
          Main Courses
        </MenuItem>
        <MenuItem component={NavLink} to={path + "/side"}>
          Side Dishes
        </MenuItem>
        <MenuItem component={NavLink} to={path + "/desserts"}>
          Desserts
        </MenuItem>
        <MenuItem component={NavLink} to={path + "/drinks"}>
          Drinks
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default SideBarNav;
