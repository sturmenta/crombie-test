"use client";

import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MoreTimeOutlinedIcon from "@mui/icons-material/MoreTimeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const drawerItems = [
  {
    text: "DASHBOARD",
    icon: <DashboardOutlinedIcon />,
  },
  {
    text: "PROVIDERS",
    icon: <BadgeOutlinedIcon />,
  },
  {
    text: "PRACTICES",
    icon: <PlaceOutlinedIcon />,
    onOpen: () => console.log("PRACTICES"),
  },
  {
    text: "JOBS",
    icon: <WorkOutlineOutlinedIcon />,
  },
  {
    text: "SCHEDULES",
    icon: <CalendarTodayOutlinedIcon />,
  },
  {
    text: "TIME & INVOICES",
    icon: <MoreTimeOutlinedIcon />,
  },
  {
    text: "TIME & PAY",
    icon: <MonetizationOnOutlinedIcon />,
  },
  {
    text: "MESSAGES",
    icon: <ChatBubbleOutlineOutlinedIcon />,
  },
];

const drawerLastItems = [
  {
    text: "HELP",
    icon: <QuestionMarkOutlinedIcon />,
  },
  {
    text: "SETTINGS",
    icon: <SettingsOutlinedIcon />,
  },
];

export const C_Drawer = () => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderList = (items: typeof drawerItems) => {
    return (
      <List>
        {items.map(({ icon, onOpen = () => {}, text }, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={onOpen}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
                style={{ color: "white" }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        {renderList(drawerItems)}
        <Box sx={{ flexGrow: 1 }} />
        {renderList(drawerLastItems)}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <p>page</p>
      </Box>
    </Box>
  );
};
