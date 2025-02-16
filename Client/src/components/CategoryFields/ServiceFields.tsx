import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { serviceTypes, workSchedules } from '../Filtering/constants/constants';

interface Props {
    serviceType: string;
    experience: string;
    workSchedule: string;
    setFormData: (value: any) => void;
}

const ServiceFields: React.FC<Props> = ({ serviceType, experience, workSchedule, setFormData }) => {
    return (
        <>
            <TextField select label="Тип услуги" name="serviceType" value={serviceType} onChange={(e) => setFormData((prev: any) => ({ ...prev, serviceType: e.target.value }))} required fullWidth>
                {serviceTypes.map((service) => <MenuItem key={service} value={service}>{service}</MenuItem>)}
            </TextField>
            <TextField label="Опыт работы (лет)" name="experience" type="number" value={experience} onChange={(e) => setFormData((prev: any) => ({ ...prev, experience: e.target.value }))} required fullWidth />
            <TextField select label="График работы" name="workSchedule" value={workSchedule} onChange={(e) => setFormData((prev: any) => ({ ...prev, workSchedule: e.target.value }))} required fullWidth>
                {workSchedules.map((schedule) => <MenuItem key={schedule} value={schedule}>{schedule}</MenuItem>)}
            </TextField>
        </>
    );
};

export default ServiceFields;
