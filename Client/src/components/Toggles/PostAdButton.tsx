import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../api/api';

const PostAdButton: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleClick = () => {
    if (user) {
      navigate('/form');
    } else {
      navigate('/login');
    }
  };

  return (
    <Button
      sx={{
        textTransform: 'none',
        backgroundColor: '#00AAFF',
        borderRadius: '12px',
        color: 'white',
        fontSize: 13,
        fontFamily: 'Manrope',
        width: 182,
        height: 36,
        '&:hover': { backgroundColor: '#0099F7' },
        lineHeight: '105%'
      }}
      onClick={handleClick}
    >
      Разместить объявление
    </Button>
  );
};

export default PostAdButton;
