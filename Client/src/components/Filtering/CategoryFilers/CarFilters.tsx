import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { carBrands } from '../constants/constants';

interface CarFiltersProps {
  additionalFilters: Record<string, string | number>;
  setAdditionalFilters: (filters: Record<string, string | number>) => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({ additionalFilters, setAdditionalFilters }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Марка</InputLabel>
        <Select
          value={additionalFilters.brand || ''}
          onChange={(e) => setAdditionalFilters({ ...additionalFilters, brand: e.target.value })}
        >
          {carBrands.map((brand) => (
            <MenuItem key={brand} value={brand}>{brand}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Модель"
        fullWidth
        value={additionalFilters.model || ''}
        onChange={(e) => setAdditionalFilters({ ...additionalFilters, model: e.target.value })}
      />
      <TextField
        label="Год (от)"
        type="number"
        fullWidth
        value={additionalFilters.year || ''}
        onChange={(e) => setAdditionalFilters({ ...additionalFilters, year: e.target.value })}
      />
    </Box>
  );
};

export default CarFilters;
