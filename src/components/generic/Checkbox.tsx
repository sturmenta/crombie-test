import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { Checkbox, FormControlLabel } from "@mui/material";

import { colors } from "@/config";

export type CheckboxProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkedIsIndeterminate?: boolean;
};

export const C_Checkbox = ({
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

export const CheckboxItem = ({
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
