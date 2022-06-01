import { FC } from 'react'; 

import { MenuItem, TextField, OutlinedTextFieldProps } from "@material-ui/core";

export interface SelectProps extends OutlinedTextFieldProps {
  options: {
    label: string | number;
    value: string | number;
  }[];
}

const Select: FC<SelectProps> = ({ options, ...textFieldProps }) => (
  <TextField select SelectProps={{ renderValue: (option: any) => option }} {...textFieldProps}>
    <MenuItem value="">
      Не указан
    </MenuItem>
    {options.map((option) => (
      <MenuItem key={option.label} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

export default Select;
