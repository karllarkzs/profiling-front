// Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Sidebar({ onLogout }) {
  const location = useLocation();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        height: "100%",
        backgroundColor: "black",
        color: "white",
        zIndex: 1,
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <Avatar
            sx={{
              backgroundColor:
                location.pathname === "/"
                  ? "rgb(188, 120, 255)"
                  : "transparent",
            }}
          >
            <HomeIcon />
          </Avatar>
          <ListItemText sx={{ paddingLeft: "10px" }} primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/create-patient">
          <Avatar
            sx={{
              backgroundColor:
                location.pathname === "/create-patient"
                  ? "rgb(188, 120, 255)"
                  : "transparent",
            }}
          >
            <AccountCircleIcon />
          </Avatar>
          <ListItemText sx={{ paddingLeft: "10px" }} primary="Create Patient" />
        </ListItem>
        <ListItem button component={Link} to="/medicines">
          <Avatar
            sx={{
              backgroundColor:
                location.pathname === "/medicines"
                  ? "rgb(188, 120, 255)"
                  : "transparent",
            }}
          >
            <AccountCircleIcon />
          </Avatar>
          <ListItemText sx={{ paddingLeft: "10px" }} primary="All Medicines" />
        </ListItem>
        {!onLogout && (
          <ListItem button component={Link} to="/login">
            <Button variant="outlined" sx={{ width: "100%" }}>
              Login
            </Button>
          </ListItem>
        )}
      </List>
      {onLogout && (
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <List>
            <ListItem>
              <Button
                variant="outlined"
                onClick={onLogout}
                sx={{ width: "100%" }}
              >
                Logout
              </Button>
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
}

export default Sidebar;
