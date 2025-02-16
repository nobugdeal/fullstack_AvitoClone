import React from 'react';
import { Pagination } from '@mui/material';
import ItemCard from './ItemCard';
import { Box } from '@mui/system';

interface Item {
  _id: string;
  name: string;
  location: string;
  type: string;
  image?: string;
}

interface ItemListProps {
  items: Item[];
  page: number;
  totalPages: number;
  onPageChange: (value: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, page, totalPages, onPageChange }) => {
  return (
    <Box sx={{fontFamily: 'Manrope', fontSize: '15px', color: '#757575'}}>
      {items.length === 0 ? (
        <p> Нет объявлений</p>
      ) : (
        items.map((item) => <ItemCard key={item._id} item={item} />)
      )}
      <Pagination count={totalPages} page={page} onChange={(_, value) => onPageChange(value)} sx={{ mt: 3, mb: 3 }} />
    </Box>
  );
};

export default ItemList;
