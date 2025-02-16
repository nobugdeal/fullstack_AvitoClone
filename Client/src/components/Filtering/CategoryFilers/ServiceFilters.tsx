import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { serviceTypes, workSchedules } from '../constants/constants';

interface ServiceFiltersProps {
  additionalFilters: Record<string, string | number>;
  setAdditionalFilters: (filters: Record<string, string | number>) => void;
}

const ServiceFilters: React.FC<ServiceFiltersProps> = ({ additionalFilters, setAdditionalFilters }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Тип услуги</InputLabel>
        <Select
          value={additionalFilters.serviceType || ''}
          onChange={(e) => setAdditionalFilters({ ...additionalFilters, serviceType: e.target.value })}
        >
          {serviceTypes.map((service) => (
            <MenuItem key={service} value={service}>{service}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Опыт (мин. лет)"
        type="number"
        fullWidth
        value={additionalFilters.experience || ''}
        onChange={(e) => setAdditionalFilters({ ...additionalFilters, experience: e.target.value })}
      />
      <FormControl fullWidth>
        <InputLabel>График работы</InputLabel>
        <Select
          value={additionalFilters.workSchedule || ''}
          onChange={(e) => setAdditionalFilters({ ...additionalFilters, workSchedule: e.target.value })}
        >
          {workSchedules.map((schedule) => (
            <MenuItem key={schedule} value={schedule}>{schedule}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ServiceFilters;
