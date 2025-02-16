import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const UserItemsToggle: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isOnHomePage = location.pathname === '/list';

  const [myItemsOnly, setMyItemsOnly] = useState<boolean>(() => {
    return localStorage.getItem('myItemsOnly') === 'true';
  });

  const toggleMyItems = () => {
    if (!isOnHomePage) {
      navigate('/list'); 
      return;
    }
    const newValue = !myItemsOnly;
    setMyItemsOnly(newValue);
    localStorage.setItem('myItemsOnly', String(newValue));
    window.dispatchEvent(new Event('myItemsOnlyChange')); 
  };

  useEffect(() => {
    const syncState = () => {
      setMyItemsOnly(localStorage.getItem('myItemsOnly') === 'true');
    };
    window.addEventListener('myItemsOnlyChange', syncState);
    return () => window.removeEventListener('myItemsOnlyChange', syncState);
  }, []);

  return (
    <Button
      variant="text"
      sx={{
        color: '#fff',
        '&:hover': { color: '#ff6163' },
        textTransform: 'none',
        fontFamily: 'Manrope',
        lineHeight: '105%'
      }}
      onClick={toggleMyItems}
    >
      {isOnHomePage ? (myItemsOnly ? 'Все объявления' : 'Мои объявления') : 'Мои объявления'}
    </Button>
  );
};

export default UserItemsToggle;
