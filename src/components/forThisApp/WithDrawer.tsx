"use client";

import { redirect, useRouter } from "next/navigation";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Lottie from "react-lottie";
import { ThemeProvider } from "@mui/material/styles";

import { useDrawerOpenStore } from "@/store";
import { colors, theme } from "@/config";
import { DrawerSection_Type, drawerItems, drawerLastItems } from "@/config";
import { useSectionSelectedStore } from "@/store/sectionSelected_store";
import {
  Animation_Empty,
  Animation_Empty_Dimensions,
} from "@/assets/animations";
import { useGetDivDimensions } from "@/hooks";
import { calculateSizeForAsset } from "@/utils";
import { createClient } from "@/utils/supabase/client";

const drawerWidth = 240;

export const WithDrawer = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const supabase = createClient();
  const {
    dimensions: animationContainerDimensions,
    div_ref: animationContainer_ref,
  } = useGetDivDimensions();
  const { drawerOpen, setDrawerOpen } = useDrawerOpenStore();
  const { sectionSelected, setSectionSelected } = useSectionSelectedStore();

  const onDrawerItemClick = (text: DrawerSection_Type) => {
    setSectionSelected(text);

    console.log(`text`, text);

    if (text === "PRACTICES") {
      setDrawerOpen(false);
      setTimeout(() => router.push("/practices"), 200);
    }
    if (text === "LOG OUT") {
      supabase.auth.signOut();
      router.replace("/login");
    } else {
      setDrawerOpen(true);
      setTimeout(() => router.push("/"), 200);
    }
  };

  const renderList = (items: typeof drawerItems) => {
    return (
      <List>
        {items.map(({ icon, text }) => (
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
                  color:
                    text === sectionSelected
                      ? colors.tertiary
                      : !drawerOpen
                      ? colors.text_over_main
                      : colors.secondary,
                }}
              >
                {icon(18)}
              </ListItemIcon>
              <ListItemText sx={{ opacity: drawerOpen ? 1 : 0 }}>
                <p
                  className={`${
                    text === sectionSelected ? "font-bold" : "font-medium"
                  } tracking-[.1em] text-sm`}
                >
                  {text}
                </p>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  const animationDimensions = calculateSizeForAsset({
    assetMaxDimensions: Animation_Empty_Dimensions,
    containerMaxDimensions: animationContainerDimensions,
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen w-full">
        <CssBaseline />
        <Drawer variant="permanent" open={drawerOpen}>
          <div className="h-8" />
          {renderList(drawerItems)}
          <div className="flex flex-1" />
          {renderList(drawerLastItems)}
          <div className="h-8" />
        </Drawer>
        {children ? (
          <div className="flex flex-1">{children}</div>
        ) : (
          <div
            className="flex flex-1 flex-col items-center justify-center p-3"
            ref={animationContainer_ref}
          >
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: Animation_Empty,
              }}
              width={animationDimensions.width}
              height={animationDimensions.height}
            />
            <p className="text-xl mt-10 font-light text-center">
              {sectionSelected}
            </p>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

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
