import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { InputNumber } from "@/components/generic";
import { colors } from "@/config";

export const AddNewModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amountOfJobs, setAmountOfJobs] = useState(0);

  const onSubmit = () => {
    console.log(`name`, name);
    console.log(`type`, type);
    console.log(`amountOfJobs`, amountOfJobs);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add new practice
        </Typography>
        <div className="h-3" />
        <FormControl sx={{ width: "100%" }}>
          <TextField
            id="name"
            placeholder="Name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormControl>
        <div className="h-3" />
        <FormControl sx={{ width: "100%" }}>
          <TextField
            id="type"
            placeholder="Practice type"
            variant="outlined"
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
        </FormControl>
        <div className="h-3" />
        <InputNumber
          aria-label="Amount of jobs for this practice"
          placeholder="Amount of jobs"
          value={amountOfJobs}
          onChange={(event, val) => val && setAmountOfJobs(val)}
        />
        <div className="h-5" />
        <div
          className="rounded-sm"
          style={{ backgroundColor: colors.secondary }}
        >
          <Button
            onClick={onSubmit}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ width: "100%" }}
          >
            Add new
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
