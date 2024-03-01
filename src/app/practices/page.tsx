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
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import { WithDrawer } from "@/components";
import { colors, theme } from "@/config";
import { useDrawerOpenStore } from "@/store";

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <CloseHeader onClose={onClose} />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                overflowY: "scroll",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 600,
                }}
              >
                <SelectInput
                  displayBy={displayBy}
                  setDisplayBy={setDisplayBy}
                />
                <Box sx={{ mt: 2 }} />
                <SearchInput />
                <Box sx={{ mt: 2 }} />
                <ListOfItems />
              </Box>
            </Box>
          </Box>
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
  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
    <Box
      sx={{
        backgroundColor: colors.secondary,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        pl: 0.5,
      }}
    >
      <IconButton aria-label="delete" size="small" onClick={onClose}>
        <CloseIcon sx={{ fontSize: 25, color: colors.text_over_secondary }} />
      </IconButton>
    </Box>
  </Box>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PlaceOutlinedIcon sx={{ fontSize: 18, color: colors.secondary }} />
            <div style={{ width: "10px" }} />
            <p>{label}</p>
          </Box>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const SearchInput = () => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
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
  </Box>
);

const ListOfItems = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, display: "flex" }}>
          <ListItem label={<b>All</b>} labelColor={colors.secondary} />
        </Box>
        <b style={{ color: colors.secondary }}>Jobs</b>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        {Array(100)
          .fill(0)
          .map((_, index) => (
            <Box key={index} sx={{ mb: 0 }}>
              <ListItem label="Label" />
            </Box>
          ))}
      </Box>
    </Box>
  );
};
