"use client";

import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WithDrawer } from "@/components/forThisApp";
import { theme } from "@/config";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <WithDrawer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
