"use client";

import React, { useCallback, useState } from "react";
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
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
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
  const [filterByText, setFilterByText] = useState("");

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
                <SearchInput value={filterByText} onChange={setFilterByText} />
                <div className="h-3" />
                <ListOfItems
                  items={MOCKED_PRACTICES}
                  filterByText={filterByText}
                />
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

type CheckboxProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkedIsIndeterminate?: boolean;
};

const C_Checkbox = ({
  checked,
  onCheckedChange,
  checkedIsIndeterminate,
}: CheckboxProps) => (
  <Checkbox
    icon={<CheckBoxOutlineBlankIcon sx={{ color: colors.secondary }} />}
    checkedIcon={
      checkedIsIndeterminate ? (
        <IndeterminateCheckBoxIcon sx={{ color: colors.secondary }} />
      ) : (
        <CheckBoxIcon sx={{ color: colors.secondary }} />
      )
    }
    checked={!!(checked || checkedIsIndeterminate)} // parse to boolean to avoid "a component is changing an uncontrolled input to be controlled" error
    onChange={(e) => onCheckedChange?.(e.target.checked)}
  />
);

const CheckboxItem = ({
  label,
  labelColor,
  checkboxProps,
}: {
  label: React.ReactNode;
  labelColor?: string;
  checkboxProps: CheckboxProps;
}) => (
  <FormControlLabel
    control={<C_Checkbox {...checkboxProps} />}
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

const SearchInput = ({
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

const ListOfItems = ({
  items,
  filterByText,
}: {
  items: {
    name: string;
    practice: string;
    amount_of_jobs: number;
    id: number;
  }[];
  filterByText: string;
}) => {
  const [itemsChecked, setItemsChecked] = useState<{ [id: number]: boolean }>(
    items.reduce((acc, { id }) => ({ ...acc, [id]: false }), {})
  );

  const filteredItemsByText = items.filter(({ name, practice }) =>
    `${name} ${practice}`.toLowerCase().includes(filterByText.toLowerCase())
  );

  const atLeastOneChecked = Object.keys(itemsChecked).some(
    (key) => itemsChecked[key as unknown as number]
  );
  const areAllChecked = Object.keys(itemsChecked).every(
    (key) => itemsChecked[key as unknown as number]
  );

  const setAllItemsChecked = useCallback(
    (checked: boolean) => {
      setItemsChecked(
        items.reduce((acc, { id }) => ({ ...acc, [id]: checked }), {})
      );
    },
    [items]
  );

  return (
    <div className="flex flex-1 flex-col overflow-y-scroll">
      <div className="flex">
        <div className="flex flex-1">
          <CheckboxItem
            label={<b>All</b>}
            labelColor={colors.secondary}
            checkboxProps={{
              checked: areAllChecked,
              checkedIsIndeterminate: !areAllChecked && atLeastOneChecked,
              onCheckedChange: (allChecked) => setAllItemsChecked(allChecked),
            }}
          />
        </div>
        <b className="w-12 mx-3" style={{ color: colors.secondary }}>
          Jobs
        </b>
      </div>
      <div className="flex flex-1 flex-col overflow-y-scroll">
        {filteredItemsByText.map(
          ({ amount_of_jobs, name, practice, id }, index) => (
            <div key={index} className="flex mt-2">
              <div className="flex flex-1">
                <CheckboxItem
                  label={`${name} - ${practice}`}
                  checkboxProps={{
                    checked: itemsChecked[id],
                    onCheckedChange: () =>
                      setItemsChecked({
                        ...itemsChecked,
                        [id]: !itemsChecked[id],
                      }),
                  }}
                />
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
          )
        )}
      </div>
    </div>
  );
};
