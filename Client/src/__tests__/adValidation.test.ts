import { validateAdForm } from '../components/Validation/adValidation';
import { expect } from '@jest/globals';

describe('Валидация формы объявления', () => {
  test('Должно вернуть ошибку, если поля пустые', () => {
    expect(validateAdForm({ name: '', description: '', location: '', type: 'Услуга', price: '',  serviceType: '', experience: '', workSchedule: '' }))
      .toBe('Все поля обязательны для заполнения!');
  });

  test('Должно вернуть ошибку, если цена не число', () => {
    expect(validateAdForm({ name: 'Тест', description: 'Описание', location: 'Санкт-Петербург', type: 'Недвижимость', price: 'abc', propertyType: 'Квартира', rooms: '2'  }))
      .toBe('Цена должна содержать только цифры!');
  });

  test('Должно пройти валидацию при корректных данных', () => {
    expect(validateAdForm({ name: 'Тест', description: 'Описание', location: 'Москва', type: 'Недвижимость', price: '1000',  propertyType: 'Квартира', area: '200', rooms: '2' }))
      .toBeNull();
  });
});
