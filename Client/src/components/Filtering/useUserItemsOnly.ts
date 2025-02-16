import { useState, useEffect } from 'react';
import { Item } from '../../types';
import { getCurrentUser } from '../../api/api';

const useUserItemsOnly = (items: Item[]) => {
  const user = getCurrentUser();
  const [myItemsOnly, setMyItemsOnly] = useState<boolean>(() => {
    return localStorage.getItem('myItemsOnly') === 'true';
  });

  useEffect(() => {
    // Обновление состояния из localStorage
    const syncStateWithLocalStorage = () => {
      setMyItemsOnly(localStorage.getItem('myItemsOnly') === 'true');
    };

    window.addEventListener('myItemsOnlyChange', syncStateWithLocalStorage);

    return () => {
      window.removeEventListener('myItemsOnlyChange', syncStateWithLocalStorage);
    };
  }, []);

  const filteredItems = myItemsOnly
    ? items.filter((item) => item.userId?._id === user?.id)
    : items;

  return { myItemsOnly, filteredItems };
};

export default useUserItemsOnly;
