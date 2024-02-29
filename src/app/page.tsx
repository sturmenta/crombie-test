"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { C_Drawer } from "@/components";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#0c3656",
          color: "#fff",
        },
      },
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <C_Drawer />
    </ThemeProvider>
  );
}
