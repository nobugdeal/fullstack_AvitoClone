import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: '700', fontFamily: 'Manrope', mb: 2 }}>
                404 - Страница не найдена
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Возможно, страница была удалена или её никогда не существовало.
            </Typography>
            <Box>
                <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                    Вернуться на главную
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
