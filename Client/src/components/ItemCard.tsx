import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const placeholderImage = 'https://via.placeholder.com/230x170';

interface Item {
  _id: string;
  name: string;
  location: string;
  type: string;
  image?: string;
}

interface ItemCardProps {
  item: Item;
}

const DetailRow = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Typography sx={{ color: '#757575', fontSize: '14px' }}>
      <span style={{ fontWeight: 500 }}>{label}:</span> {value}
    </Typography>
  ) : null;

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/item/${item._id}`)}
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center', sm: 'flex-start' },
        p: 2,
        border: 'none',
        boxShadow: 'none',
        '&:hover': { backgroundColor: '#f5f5f5' },
        cursor: 'pointer',
        borderRadius: 2
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 230,
          height: 170,
          objectFit: 'cover',
          borderRadius: '5px',
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.02)' },
        mr: 2
        }}
        image={item.image || placeholderImage}
        alt={item.name}
      />

      <CardContent
        sx={{
          p: 0,
          textAlign: { xs: 'center', sm: 'left' },
          mt: { xs: 2, sm: 0 }
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#0af',
            transition: 'color 0.1s ease',
            '&:hover': { color: '#ff6163' },
            mb: 1,
            cursor: 'pointer'
          }}
          onClick={() => navigate(`/item/${item._id}`)}
        >
          {item.name}
        </Typography>
        <DetailRow label="Адрес" value={item.location} />
        <DetailRow label="Категория" value={item.type} />

        <Button
          sx={{
            backgroundColor: '#0099F7',
            color: '#fff',
            mt: 2,
            width: { xs: '100%', sm: 'auto' },
            '&:hover': { backgroundColor: '#0088E7' }
          }}
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/item/${item._id}`);
          }}
        >
          Открыть
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
