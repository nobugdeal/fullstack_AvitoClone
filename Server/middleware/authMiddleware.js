import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    console.log('🚫 Нет токена, отказано в доступе');
    return res.status(401).json({ error: 'Нет доступа' });
  }

  try {
    console.log('📜 Проверка токена:', token);
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('❌ Неверный токен:', error);
    res.status(401).json({ error: 'Неверный токен' });
  }
};

export default authMiddleware;
