"use client";

import { ThemeProvider } from "@mui/material/styles";

import { C_Drawer } from "@/components";
import { theme } from "@/config";

export default function Practices() {
  return (
    <ThemeProvider theme={theme}>
      <C_Drawer>
        <p>practices</p>
      </C_Drawer>
    </ThemeProvider>
  );
}
