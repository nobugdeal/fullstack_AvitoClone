import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { carBrands } from '../Filtering/constants/constants';

interface Props {
    brand: string;
    model: string;
    year: string;
    mileage: string;
    setFormData: (value: any) => void;
}

const CarFields: React.FC<Props> = ({ brand, model, year, mileage, setFormData }) => {
    return (
        <>
            <TextField select label="Марка" name="brand" value={brand} onChange={(e) => setFormData((prev: any) => ({ ...prev, brand: e.target.value }))} required fullWidth>
                {carBrands.map((brand) => <MenuItem key={brand} value={brand}>{brand}</MenuItem>)}
            </TextField>
            <TextField label="Модель" name="model" value={model} onChange={(e) => setFormData((prev: any) => ({ ...prev, model: e.target.value }))} required fullWidth />
            <TextField label="Год выпуска" name="year" type="number" value={year} onChange={(e) => setFormData((prev: any) => ({ ...prev, year: e.target.value }))} required fullWidth />
            <TextField label="Пробег (км)" name="mileage" type="number" value={mileage} onChange={(e) => setFormData((prev: any) => ({ ...prev, mileage: e.target.value }))} fullWidth />
        </>
    );
};

export default CarFields;
