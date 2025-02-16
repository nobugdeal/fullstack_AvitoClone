import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import itemRoutes from './routes/items.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Подключено к MongoDB'))
  .catch((err) => console.error('❌ Ошибка подключения к MongoDB:', err));

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send({ message: '🚀 API работает! Отправь GET-запрос на /items' });
});


app.use('/auth', authRoutes);
app.use('/items', itemRoutes);


app.use((req, res) => {
  res.status(404).json({ error: '🔍 API route not found' });
});


app.listen(PORT, () => {
  console.log(`✅🚀 Сервер запущен на порту ${PORT}`);
});
