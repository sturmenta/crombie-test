"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDrawerOpenStore } from "@/store";
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
import { colors } from "@/config";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: colors.main,
  color: colors.text_over_main,
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
  backgroundColor: colors.main,
  color: colors.text_over_main,
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

export const WithDrawer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { drawerOpen, setDrawerOpen } = useDrawerOpenStore();

  const onDrawerItemClick = (text: string) => {
    if (text === "PRACTICES") {
      setDrawerOpen(false);
      setTimeout(() => {
        router.push("/practices");
      }, 200);
    } else {
      setDrawerOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 200);
    }
  };

  const renderList = (items: typeof drawerItems) => {
    return (
      <List>
        {items.map(({ icon, text }, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => onDrawerItemClick(text)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : "auto",
                  justifyContent: "center",
                  color: colors.text_over_main,
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: drawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={drawerOpen}>
        <Box sx={{ height: 30 }} />
        {renderList(drawerItems)}
        <Box sx={{ flexGrow: 1 }} />
        {renderList(drawerLastItems)}
        <Box sx={{ height: 30 }} />
      </Drawer>
      <Box sx={{ flex: 1, display: "flex" }}>
        {!drawerOpen ? children : null}
      </Box>
    </Box>
  );
};
