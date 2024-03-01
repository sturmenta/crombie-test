import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: { MuiPaper: { styleOverrides: { root: {} } } },
});

export const colors = {
  main: "#164d7a",
  secondary: "#22a59e",
  tertiary: "#3ea1d3",
  text_over_main: "#fff",
  text_over_secondary: "#fff",
};
