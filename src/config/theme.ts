import { createTheme } from "@mui/material";

export const theme = createTheme({
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
