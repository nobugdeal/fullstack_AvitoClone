import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm } from '../components/Validation/authValidation';
import { isValidImageUrl } from '../components/Validation/validateImage';
import PasswordField from '../components/PasswordField';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const placeholderAvatar = 'https://www.w3schools.com/howto/img_avatar.png';

  const handleRegister = async () => {
    setError('');
    setSuccess(false);

    const errors = validateRegisterForm({ username, email, password, avatar });
    if (errors.length > 0) {
      setError(errors.join(' '));
      return;
    }

    try {
      const validAvatar = isValidImageUrl(avatar) ? avatar : placeholderAvatar;

      const result = await registerUser({ username, email, password, avatar: validAvatar });

      if (result.error) {
        if (result.error.includes('Username already exists')) {
          setError('Такое имя пользователя уже занято!');
        } else if (result.error.includes('Email already registered')) {
          setError('Этот email уже используется!');
        } else {
          setError(result.error);
        }
      } else {
        sessionStorage.setItem('savedEmail', email);
        sessionStorage.setItem('savedPassword', password);

        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>Регистрация</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Регистрация успешна! Перенаправление...</Alert>}

      <TextField label="Имя пользователя" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Email" fullWidth value={email} autoComplete="email" slotProps={{ input: { type: 'email' } }} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
      

      <PasswordField label="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />

      <TextField label="Ссылка на аватар (необязательно)" fullWidth value={avatar} onChange={(e) => setAvatar(e.target.value)} sx={{ mb: 2 }} />

      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>Зарегистрироваться</Button>
      <Button color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/login')}>Уже есть аккаунт?</Button>
    </Container>
  );
};

export default RegisterPage;
