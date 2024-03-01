"use client";

import { ThemeProvider } from "@mui/material/styles";

import { C_Drawer } from "@/components";
import { theme } from "@/config";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <C_Drawer>
        <></>
      </C_Drawer>
    </ThemeProvider>
  );
}
