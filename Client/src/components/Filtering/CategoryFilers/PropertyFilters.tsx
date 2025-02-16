import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { propertyTypes } from '../constants/constants';

interface PropertyFiltersProps {
  additionalFilters: Record<string, string | number>;
  setAdditionalFilters: (filters: Record<string, string | number>) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ additionalFilters, setAdditionalFilters }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Тип недвижимости</InputLabel>
        <Select
          value={additionalFilters.propertyType || ''}
          onChange={(e) => setAdditionalFilters({ ...additionalFilters, propertyType: e.target.value })}
        >
          {propertyTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Комнат (мин.)"
        type="number"
        fullWidth
        value={additionalFilters.rooms || ''}
        onChange={(e) => setAdditionalFilters({ ...additionalFilters, rooms: e.target.value })}
      />
      <TextField
        label="Площадь (мин. м²)"
        type="number"
        fullWidth
        value={additionalFilters.area || ''}
        onChange={(e) => setAdditionalFilters({ ...additionalFilters, area: e.target.value })}
      />
    </Box>
  );
};

export default PropertyFilters;
