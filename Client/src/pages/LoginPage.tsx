import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../components/Validation/authValidation';
import PasswordField from '../components/PasswordField';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(sessionStorage.getItem('savedEmail') || '');
  const [password, setPassword] = useState(sessionStorage.getItem('savedPassword') || '');
  const [error, setError] = useState('');

  useEffect(() => {
    sessionStorage.removeItem('savedEmail');
    sessionStorage.removeItem('savedPassword');
  }, []);

  const handleLogin = async () => {
    setError('');

    const validationError = validateLoginForm(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = await loginUser({ email, password });

    if (result.error) {
      setError(result.error);
    } else {
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>Вход</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <TextField label="Email" fullWidth value={email} autoComplete="email" slotProps={{ input: { type: 'email' } }} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
        

        <PasswordField label="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button variant="contained" color="primary" fullWidth type="submit">Войти</Button>
      </form>

      <Button color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/register')}>Регистрация</Button>
    </Container>
  );
};

export default LoginPage;
