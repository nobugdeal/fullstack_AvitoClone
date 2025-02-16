import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/api';

const getDraftKey = () => {
  const currentUser = getCurrentUser();
  return `formDraft_${currentUser?.id || 'guest'}`;
};

const useDraft = (initialData: any) => {
  const draftKey = getDraftKey();
  const savedDraft = localStorage.getItem(draftKey);
  
  const [formData, setFormData] = useState(savedDraft ? JSON.parse(savedDraft) : initialData);
  const [isClearing, setIsClearing] = useState(false); 

  useEffect(() => {
    if (!isClearing) {
      localStorage.setItem(draftKey, JSON.stringify(formData));
      console.log('🔄 Черновик сохранен:', formData);
    }
  }, [formData, draftKey, isClearing]);

  const clearDraft = () => {
    console.log('🗑 Очистка черновика:', draftKey);
    setIsClearing(true); 
    localStorage.removeItem(draftKey);
    setFormData({ ...initialData });

  
    setTimeout(() => setIsClearing(false), 500);
  };

  return { formData, setFormData, clearDraft };
};

export default useDraft;
