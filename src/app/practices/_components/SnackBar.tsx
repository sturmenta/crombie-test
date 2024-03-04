import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const SnackBar = ({
  open,
  handleClose,
  type,
  text,
}: {
  open: boolean;
  handleClose: () => void;
  type: "success" | "error";
  text: string;
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={(_, reason?: string) => {
          if (reason === "clickaway") return;
          handleClose();
        }}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
