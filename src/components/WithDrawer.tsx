"use client";

import { useRouter } from "next/navigation";
import { useDrawerOpenStore } from "@/store";
import { styled, Theme, CSSObject } from "@mui/material/styles";
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
    icon: (size: number) => <DashboardOutlinedIcon sx={{ fontSize: size }} />,
  },
  {
    text: "PROVIDERS",
    icon: (size: number) => <BadgeOutlinedIcon sx={{ fontSize: size }} />,
  },
  {
    text: "PRACTICES",
    icon: (size: number) => <PlaceOutlinedIcon sx={{ fontSize: size }} />,
  },
  {
    text: "JOBS",
    icon: (size: number) => <WorkOutlineOutlinedIcon sx={{ fontSize: size }} />,
  },
  {
    text: "SCHEDULES",
    icon: (size: number) => (
      <CalendarTodayOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
  {
    text: "TIME & INVOICES",
    icon: (size: number) => <MoreTimeOutlinedIcon sx={{ fontSize: size }} />,
  },
  {
    text: "TIME & PAY",
    icon: (size: number) => (
      <MonetizationOnOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
  {
    text: "MESSAGES",
    icon: (size: number) => (
      <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
];

const drawerLastItems = [
  {
    text: "HELP",
    icon: (size: number) => (
      <QuestionMarkOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
  {
    text: "SETTINGS",
    icon: (size: number) => <SettingsOutlinedIcon sx={{ fontSize: size }} />,
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
                  mr: drawerOpen ? 2 : "auto",
                  justifyContent: "center",
                  color: colors.text_over_main,
                }}
              >
                {icon(18)}
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
    <div className="flex h-screen">
      <CssBaseline />
      <Drawer variant="permanent" open={drawerOpen}>
        <div className="h-8" />
        {renderList(drawerItems)}
        <div className="flex flex-1" />
        {renderList(drawerLastItems)}
        <div className="h-8" />
      </Drawer>
      <div className="flex flex-1">{!drawerOpen ? children : null}</div>
    </div>
  );
};
