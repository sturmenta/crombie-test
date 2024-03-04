import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { InputNumber } from "@/components/generic";
import { colors } from "@/config";
import { useSupabase } from "@/components/generic/supabase";

type Practice_Type = {
  name: string;
  type: string;
  amount_of_jobs: number;
};

export const AddNewModal = ({
  open,
  handleClose,
  showSuccessToast,
  setSuccessToastMessage,
  showErrorToast,
  setErrorToastMessage,
}: {
  open: boolean;
  handleClose: () => void;
  showSuccessToast: () => void;
  setSuccessToastMessage: (message: string) => void;
  showErrorToast: () => void;
  setErrorToastMessage: (message: string) => void;
}) => {
  const { supabase } = useSupabase();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ name, type, amount_of_jobs }: Practice_Type) =>
      await supabase.from("practice").insert({ name, type, amount_of_jobs }),
    onSuccess: (data, variables, context) =>
      onSuccess(data, variables, context),
    onError: (error, variables, context) => onError(error, variables, context),
  });

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount_of_jobs, setAmountOfJobs] = useState<
    Practice_Type["amount_of_jobs"] | undefined
  >(0);

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    setAmountOfJobs(undefined);
  }, []);

  // ─────────────────────────────────────────────────────────────────────

  const onSubmit = useCallback(() => {
    mutate({ amount_of_jobs: amount_of_jobs || 0, name, type });
  }, [amount_of_jobs, name, type, mutate]);

  const onSuccess = (
    data: UseMutationResult["data"],
    variables: Practice_Type,
    context: UseMutationResult["context"]
  ) => {
    const _data = data as { error: any };
    if (_data?.error) {
      showErrorToast();
      return console.error(`data.error`, _data?.error);
    }

    handleClose();
    setSuccessToastMessage("The practice was added successfully!");
    showSuccessToast();

    setName("");
    setType("");
    setAmountOfJobs(undefined);
  };

  const onError = (
    error: UseMutationResult["error"],
    variables: Practice_Type,
    context: UseMutationResult["context"]
  ) => {
    if (!error) return;

    setErrorToastMessage("There was an error adding the practice");
    showErrorToast();
    console.error(`error`, error);
  };

  // ─────────────────────────────────────────────────────────────────────

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
          value={amount_of_jobs}
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
            {isPending ? "Adding new..." : "Add new"}
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
