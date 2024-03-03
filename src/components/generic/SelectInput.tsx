import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { colors } from "@/config";

export const SelectInput = ({
  displayBy,
  setDisplayBy,
}: {
  displayBy: string;
  setDisplayBy: (value: string) => void;
}) => (
  <FormControl sx={{ width: "100%" }}>
    <InputLabel id="select-label">Display by</InputLabel>
    <Select
      labelId="select-label"
      id="select"
      value={displayBy}
      label="Display by"
      onChange={(event: SelectChangeEvent) => setDisplayBy(event.target.value)}
      IconComponent={() => (
        <ExpandMoreIcon sx={{ color: colors.secondary, margin: 1 }} />
      )}
    >
      {[{ value: "practice", label: "Practice" }].map(({ value, label }) => (
        <MenuItem value={value} key={value}>
          <div className="flex items-center">
            <PlaceOutlinedIcon sx={{ fontSize: 18, color: colors.secondary }} />
            <div style={{ width: "10px" }} />
            <p>{label}</p>
          </div>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
