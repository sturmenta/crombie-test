import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { colors } from "@/config";

export const CloseHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex justify-end mt-5">
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
