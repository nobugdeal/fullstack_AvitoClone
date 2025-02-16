import React, { useState } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../../api/api';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserItemsToggle from '../../components/Toggles/UserItemsToggle';
import PostAdButton from '../Toggles/PostAdButton';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    setAnchorEl(null);
    navigate('/list');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: 44, backgroundColor: '#292929', px: 2, justifyContent: 'space-around' }}>
      
      <Typography
        sx={{ 
          cursor: 'pointer', 
          fontSize: 14, 
          color: 'white', 
          fontFamily: 'Manrope',
          '&:hover': { color: '#ff6163' },
          transition: 'color 0.2s ease-in-out'
        }}
        onClick={() => navigate('/list')}
      >
        Главная
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {user ? (
          <>
            <UserItemsToggle />
            
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                color: '#fff',
                '&:hover': { color: '#ff6163' },
                transition: 'color 0.05s'
              }}
              onClick={handleMenuOpen}
            >
              <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
              <Typography sx={{ display: 'flex', alignItems: 'flex-end', fontSize: 14, fontFamily: 'Manrope' }}>
                {user.username}
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              </Typography>
            </Box>

            <Menu
              anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              sx={{
                '& .MuiPaper-root': {
                  overflow: 'hidden',
                  height: '38px',
                  margin: 0,
                  padding: 0,
                  borderRadius: '12px',
                },
                mt: '6px',
                color: 757575,
              }}
            >
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </>
        ) : (
          <Typography
            sx={{ 
              cursor: 'pointer', 
              fontSize: 14, 
              color: 'white', 
              fontFamily: 'Manrope',
              '&:hover': { color: '#ff6163' }
            }}
            onClick={() => navigate('/login')}
          >
            Вход и регистрация
          </Typography>
        )}

        <PostAdButton />
      </Box>
    </Box>
  );
};

export default Header;
