import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategorySelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <TextField select label="Категория" name="type" value={value} onChange={onChange} required fullWidth>
      <MenuItem value="Недвижимость">Недвижимость</MenuItem>
      <MenuItem value="Авто">Авто</MenuItem>
      <MenuItem value="Услуги">Услуги</MenuItem>
    </TextField>
  );
};

export default CategorySelector;
