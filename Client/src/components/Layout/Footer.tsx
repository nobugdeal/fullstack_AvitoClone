import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ height: 140, backgroundColor: '#f7f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: '#757575', fontSize: 14, textAlign: 'center' }}>© 2025 Avito Clone <br />Frontend Trainee Assignment</Typography>
        </Box>
    );
};

export default Footer;
