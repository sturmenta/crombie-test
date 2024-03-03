import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import { colors } from "@/config";

export const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="flex items-center">
    <FormControl sx={{ width: "100%" }}>
      <TextField
        id="search"
        placeholder="Search"
        variant="outlined"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: colors.secondary }} />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
    <IconButton aria-label="delete" size="small" sx={{ marginLeft: 1 }}>
      <FilterListIcon sx={{ fontSize: 25, color: colors.secondary }} />
    </IconButton>
  </div>
);
