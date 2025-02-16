import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardMedia, CardContent, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchItemById, deleteItem, getCurrentUser } from '../api/api';
import ItemDetails from '../components/ItemDetails';
import avitoLogo from '../assets/avito-logo.svg';

interface Item {
  _id: string;
  name: string;
  description: string;
  location: string;
  type: string;
  price: number;
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
  image?: string;
  userId?: string | { _id: string };
}

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!id) return;

    fetchItemById(id)
      .then(response => {
        console.log('📌 Полученное объявление:', response);
        setItem(response);
      })
      .catch(error => console.error('Ошибка загрузки:', error));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteItem(id);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const handleEdit = () => {
    if (!item) return;
    navigate(`/form/${item._id}`);
  };

  const isOwner = currentUser && item?.userId &&
    (typeof item.userId === 'string'
      ? item.userId === currentUser.id
      : item.userId._id === currentUser.id);

  return (
    <Container sx={{ my: 2 }}>
      <img
        onClick={() => navigate('/')}
        src={avitoLogo}
        alt="Avito Logo"
        style={{ width: '150px', height: 'auto', marginBottom: '15px', cursor: 'pointer' }}
      />
      
      {item ? (
        <Box>
          <Typography variant="h4" sx={{ fontFamily: 'Manrope', fontWeight: '700', fontSize: '32px', mb: 2, mt: 2 }}>
            {item.name}
          </Typography>
          
          <Card sx={{ maxWidth: '636px', width: '100%', height: 'auto', boxShadow: 'none' }}>
            <CardMedia
              sx={{
                mb: 1,
                borderRadius: '10px',
                width: '100%',
                maxWidth: '636px', 
                height: 'auto', 
                objectFit: 'cover'
              }}
              component="img"
              image={item.image || 'https://steamuserimages-a.akamaihd.net/ugc/2079019457927111911/45068F1A462AF6EB757ADABDD621AB5FDE49E38E/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'}
              alt={item.name}
            />

            <CardContent>
              <Typography variant="body2" sx={{ fontFamily: 'Manrope', fontWeight: '700', fontSize: '28px', mb: 1 }}>
                {item.price.toLocaleString('ru-RU')} ₽
              </Typography>

              <Typography variant="body2" sx={{ fontSize: '16px', mb: 1, color: '#757575' }}>
                Адрес: <span style={{ color: '#000' }}>{item.location}</span>
              </Typography>

              <Typography variant="body1" sx={{ fontFamily: 'Manrope', fontWeight: '700', fontSize: '28px', mb: 1 }}>
                Описание
              </Typography>
              <Typography variant="body1">{item.description}</Typography>

              <Typography variant="body2" sx={{ fontSize: '16px', color: '#757575', mt: 1 }}>
                Категория: <span style={{ color: '#000', fontWeight: 400 }}>{item.type}</span>
              </Typography>

              <ItemDetails
                type={item.type}
                propertyType={item.propertyType}
                area={item.area}
                rooms={item.rooms}
                brand={item.brand}
                model={item.model}
                year={item.year}
                mileage={item.mileage}
                serviceType={item.serviceType}
                experience={item.experience}
                workSchedule={item.workSchedule}
              />

              {isOwner && (
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mr: 2 }}>
                    Редактировать
                  </Button>
                  <Button variant="contained" color="error" onClick={handleDelete}>
                    Удалить
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Typography>Загрузка...</Typography>
      )}
    </Container>
  );
};

export default ItemPage;
