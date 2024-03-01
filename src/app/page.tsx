"use client";

import { ThemeProvider } from "@mui/material/styles";

import { WithDrawer } from "@/components";
import { theme } from "@/config";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <WithDrawer>
        <></>
      </WithDrawer>
    </ThemeProvider>
  );
}
