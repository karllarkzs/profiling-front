import React from "react";
import { Box, Tab as MuiTab, Tabs as MuiTabs } from "@mui/material";

export const Tabs = (props) => (
  <MuiTabs
    {...props}
    sx={{
      "& .MuiTabs-root": {
        color: "black",
        backgroundColor: "#f3f3ec", // Change background color here
        borderBottom: "1px solid #e8e8e8",
      },
      "& .MuiTabs-indicator": {
        backgroundColor: "black",
        color: "black",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      },
    }}
  />
);

export const Tab = (props) => (
  <MuiTab
    disableRipple
    {...props}
    sx={{
      root: {
        textTransform: "none",
        minWidth: 72,
        fontSize: 12,
        "&:hover": {
          color: "black",
          opacity: 1,
        },
        "&.Mui-selected": {
          color: "black",
          fontWeight: 100,
          fontSize: 14,
        },
        "&.Mui-focusVisible": {
          color: "inherit", // Remove the default blue color when focused
        },
      },
    }}
  />
);

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
