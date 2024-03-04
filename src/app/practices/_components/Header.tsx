import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { colors } from "@/config";

export const Header = ({
  onClose,
  onAddNew,
}: {
  onClose: () => void;
  onAddNew: () => void;
}) => (
  <div className="flex mt-5 mb-5">
    <div
      className="ml-6 rounded-sm"
      style={{ backgroundColor: colors.secondary }}
    >
      <Button
        onClick={onAddNew}
        sx={{ backgroundColor: colors.secondary }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add new
      </Button>
    </div>
    <div className="flex-1" />
    <div
      className="rounded-tl-full rounded-bl-full pl-1"
      style={{ backgroundColor: colors.secondary }}
    >
      <IconButton aria-label="delete" size="small" onClick={onClose}>
        <CloseIcon sx={{ fontSize: 25, color: colors.text_over_secondary }} />
      </IconButton>
    </div>
  </div>
);
