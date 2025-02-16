import axios from 'axios';

const API_URL = 'http://localhost:3000';


export const fetchItems = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(`${API_URL}/items`, { headers });
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка при получении объявлений:', error);
    return [];
  }
};

export const registerUser = async (userData: { username: string; email: string; password: string; avatar: string; }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data?.error || 'Ошибка регистрации' };
  }
};

export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  } catch (error: any) {
    return { error: error.response?.data?.error || 'Ошибка авторизации' };
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const createItem = async (item: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ Ошибка: пользователь не авторизован');
      return { error: 'Вы не авторизованы' };
    }

    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.post(`${API_URL}/items`, item, { headers });
    return response.data;
  } catch (error: any) {
    console.error('❌ Ошибка при создании объявления:', error.response?.data || error);
    return { error: error.response?.data?.error || 'Ошибка сервера' };
  }
};

export const fetchItemById = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(`${API_URL}/items/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка при получении объявления:', error);
    return null;
  }
};

export const updateItem = async (id: string, item: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return { error: 'Вы не авторизованы' };

    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.put(`${API_URL}/items/${id}`, item, { headers });
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка при обновлении объявления:', error);
    return null;
  }
};

export const deleteItem = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return { error: 'Вы не авторизованы' };

    const headers = { Authorization: `Bearer ${token}` };
    await axios.delete(`${API_URL}/items/${id}`, { headers });
    return true;
  } catch (error) {
    console.error('❌ Ошибка при удалении объявления:', error);
    return false;
  }
};
