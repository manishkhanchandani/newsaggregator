import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectBoxProps } from './types';

const SelectBox = ({
  value,
  handleChange,
  options,
  name,
  label
}: SelectBoxProps): React.ReactElement => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`label_${name}`}>{label}</InputLabel>
        <Select
          labelId={`label_${name}`}
          name={name}
          value={value}
          label={label}
          onChange={handleChange}>
          <MenuItem value="">Select</MenuItem>
          {options?.map((item) => {
            return (
              <MenuItem value={item.key} key={item.key}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectBox;
