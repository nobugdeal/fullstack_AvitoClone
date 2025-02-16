import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { propertyTypes } from '../Filtering/constants/constants';

interface Props {
    propertyType: string;
    area: string;
    rooms: string;
    setFormData: (value: any) => void;
}

const PropertyFields: React.FC<Props> = ({ propertyType, area, rooms, setFormData }) => {
    return (
        <>
            <TextField select label="Тип недвижимости" name="propertyType" value={propertyType} onChange={(e) => setFormData((prev: any) => ({ ...prev, propertyType: e.target.value }))} required fullWidth>
                {propertyTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </TextField>
            <TextField label="Площадь (кв. м)" name="area" type="number" value={area} onChange={(e) => setFormData((prev: any) => ({ ...prev, area: e.target.value }))} required fullWidth />
            <TextField label="Количество комнат" name="rooms" type="number" value={rooms} onChange={(e) => setFormData((prev: any) => ({ ...prev, rooms: e.target.value }))} required fullWidth />
        </>
    );
};

export default PropertyFields;
