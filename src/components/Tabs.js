import React from "react";
import { Box, Tab as MuiTab, Tabs as MuiTabs } from "@mui/material";
import { withStyles } from "@mui/styles";

export const Tabs = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: "#eaeaea",
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
}))(MuiTabs);

export const Tab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontSize: 12,
    "&:hover": {
      color: "black",
      opacity: 1,
    },
    "&$selected": {
      color: "black",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 14,
    },
    "&$focusVisible": {
      color: "inherit", // Remove the default blue color when focused
    },
  },
  selected: {},
  focusVisible: {}, // Add focusVisible state
}))((props) => <MuiTab disableRipple {...props} />);

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
