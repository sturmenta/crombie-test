"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import { WithDrawer } from "@/components";
import { colors, theme } from "@/config";
import { useDrawerOpenStore } from "@/store";
import { MOCKED_PRACTICES } from "@/mocked";

export default function Practices() {
  const router = useRouter();
  const { drawerOpen, setDrawerOpen } = useDrawerOpenStore();

  const [displayBy, setDisplayBy] = useState("practice");

  const onClose = () => {
    setDrawerOpen(true);
    setTimeout(() => router.push("/"), 300);
  };

  return (
    <ThemeProvider theme={theme}>
      <WithDrawer>
        {drawerOpen ? null : (
          <div className="flex flex-1 flex-col">
            <CloseHeader onClose={onClose} />
            <div className="flex flex-1 justify-center overflow-y-scroll">
              <div className="p-5 flex flex-1 flex-col max-w-xl">
                <SelectInput
                  displayBy={displayBy}
                  setDisplayBy={setDisplayBy}
                />
                <div className="h-3" />
                <SearchInput />
                <div className="h-3" />
                <ListOfItems items={MOCKED_PRACTICES} />
                <div className="h-5" />
              </div>
            </div>
          </div>
        )}
      </WithDrawer>
    </ThemeProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const C_Checkbox = () => (
  <Checkbox
    icon={<CheckBoxIcon sx={{ color: colors.secondary }} />}
    checkedIcon={<CheckBoxOutlineBlankIcon sx={{ color: colors.secondary }} />}
  />
);

const ListItem = ({
  label,
  labelColor,
}: {
  label: React.ReactNode;
  labelColor?: string;
}) => (
  <FormControlLabel
    control={<C_Checkbox />}
    label={label}
    sx={{ color: labelColor }}
  />
);

const CloseHeader = ({ onClose }: { onClose: () => void }) => (
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

const SelectInput = ({
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

const SearchInput = () => (
  <div className="flex items-center">
    <FormControl sx={{ width: "100%" }}>
      <TextField
        id="search"
        placeholder="Search"
        variant="outlined"
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

const ListOfItems = ({
  items,
}: {
  items: { name: string; practice: string; amount_of_jobs: number }[];
}) => {
  return (
    <div className="flex flex-1 flex-col overflow-y-scroll">
      <div className="flex">
        <div className="flex flex-1">
          <ListItem label={<b>All</b>} labelColor={colors.secondary} />
        </div>
        <b className="w-12 mx-3" style={{ color: colors.secondary }}>
          Jobs
        </b>
      </div>
      <div className="flex flex-1 flex-col overflow-y-scroll">
        {items.map(({ amount_of_jobs, name, practice }, index) => (
          <div key={index} className="flex mt-2">
            <div className="flex flex-1">
              <ListItem label={`${name} - ${practice}`} />
            </div>
            <div className="px-2 flex items-center">
              <p
                className="w-12 text-center"
                style={{ color: colors.secondary }}
              >
                ({amount_of_jobs > 99 ? "99+" : amount_of_jobs})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
