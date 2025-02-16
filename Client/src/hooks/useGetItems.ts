import { useState, useEffect } from 'react';
import { fetchItems } from '../api/api';
import { Item } from '../types';

const useGetItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data: Item[] = await fetchItems();
        if (Array.isArray(data)) {
          setItems(data.sort((a, b) => b._id.localeCompare(a._id)));
        } else {
          setError('Ошибка: API вернул некорректные данные');
          console.error('⚠️ API вернул некорректные данные:', data);
        }
      } catch (error) {
        setError('Ошибка при загрузке объявлений');
        console.error('❌ Ошибка при загрузке объявлений:', error);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  return { items, loading, error };
};

export default useGetItems;
