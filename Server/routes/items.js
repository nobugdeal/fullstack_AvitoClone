import express from 'express';
import Item from '../models/item.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('📥 [GET] /items - Получение списка объявлений');
  try {
    const items = await Item.find().populate('userId', 'username email');
    res.json(items);
  } catch (err) {
    console.error('❌ Ошибка получения объявлений:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


router.get('/:id', async (req, res) => {
  console.log(`📥 [GET] /items/${req.params.id} - Получение объявления`);
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'username email');
    if (!item) {
      console.warn(`⚠️ Объявление с ID ${req.params.id} не найдено`);
      return res.status(404).json({ error: 'Объявление не найдено' });
    }
    res.json(item);
  } catch (err) {
    console.error('❌ Ошибка получения объявления:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  console.log('📤 [POST] /items - Попытка создать объявление:', req.body);
  try {
    const { name, description, location, image, type, price, ...extraFields } = req.body;

    if (!name || !description || !location || !type || price === undefined) {
      return res.status(400).json({ error: 'Заполните все обязательные поля' });
    }

    let itemData = { name, description, location, image, type, price, userId: req.user.id };

    switch (type) {
      case 'Недвижимость':
        if (!extraFields.propertyType || !extraFields.area || !extraFields.rooms) {
          return res.status(400).json({ error: 'Некорректные данные для недвижимости' });
        }
        Object.assign(itemData, {
          propertyType: extraFields.propertyType,
          area: extraFields.area,
          rooms: extraFields.rooms,
        });
        break;

      case 'Авто':
        if (!extraFields.brand || !extraFields.model || !extraFields.year) {
          return res.status(400).json({ error: 'Некорректные данные для авто' });
        }
        Object.assign(itemData, {
          brand: extraFields.brand,
          model: extraFields.model,
          year: extraFields.year,
          mileage: extraFields.mileage ?? null,
        });
        break;

      case 'Услуги':
        if (!extraFields.serviceType || !extraFields.experience) {
          return res.status(400).json({ error: 'Некорректные данные для услуг' });
        }
        Object.assign(itemData, {
          serviceType: extraFields.serviceType,
          experience: extraFields.experience,
          workSchedule: extraFields.workSchedule ?? '',
        });
        break;
    }

    const newItem = new Item(itemData);
    await newItem.save();
    console.log('✅ Объявление создано успешно:', newItem);
    res.status(201).json(newItem);
  } catch (err) {
    console.error('❌ Ошибка при создании объявления:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  console.log(`🔄 [PUT] /items/${req.params.id} - Обновление объявления`);
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      console.warn(`⚠️ Объявление с ID ${req.params.id} не найдено`);
      return res.status(404).json({ error: 'Объявление не найдено' });
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Нет доступа к этому объявлению' });
    }

    Object.assign(item, req.body);
    await item.save();

    console.log('✅ Объявление обновлено:', item);
    res.json(item);
  } catch (err) {
    console.error('❌ Ошибка обновления объявления:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  console.log(`🗑 [DELETE] /items/${req.params.id} - Удаление объявления`);
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Объявление не найдено' });
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Нет доступа к этому объявлению' });
    }

    await item.deleteOne();
    console.log(`✅ Объявление с ID ${req.params.id} удалено`);
    res.status(204).send();
  } catch (err) {
    console.error('❌ Ошибка удаления объявления:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

export default router;
