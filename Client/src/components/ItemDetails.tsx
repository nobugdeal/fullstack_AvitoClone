import React from 'react';
import { Typography } from '@mui/material';

interface ItemDetailsProps {
  type: string;
  propertyType?: string;
  area?: number;
  rooms?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType?: string;
  experience?: number;
  workSchedule?: string;
}

const ItemDetails: React.FC<ItemDetailsProps> = (props) => {
  const { type, propertyType, area, rooms, brand, model, year, mileage, serviceType, experience, workSchedule } = props;

  const DetailRow = ({ label, value }: { label: string; value?: string | number }) =>
    value ? (
      <Typography sx={{ fontSize: '16px' }}>
        <span style={{ color: '#757575' }}>{label}:</span> {value}
      </Typography>
    ) : null;

  switch (type) {
    case 'Недвижимость':
      return (
        <>
          <DetailRow label="Тип недвижимости" value={propertyType} />
          <DetailRow label="Площадь" value={area ? `${area} кв. м` : undefined} />
          <DetailRow label="Количество комнат" value={rooms} />
        </>
      );
    case 'Авто':
      return (
        <>
          <DetailRow label="Марка" value={brand} />
          <DetailRow label="Модель" value={model} />
          <DetailRow label="Год выпуска" value={year} />
          <DetailRow label="Пробег" value={mileage ? `${mileage} км` : undefined} />
        </>
      );
    case 'Услуги':
      return (
        <>
          <DetailRow label="Тип услуги" value={serviceType} />
          <DetailRow label="Опыт работы" value={experience ? `${experience} лет` : undefined} />
          <DetailRow label="График работы" value={workSchedule} />
        </>
      );
    default:
      return null;
  }
};

export default ItemDetails;
