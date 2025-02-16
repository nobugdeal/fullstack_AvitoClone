import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Box, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import PropertyFilters from './CategoryFilers/PropertyFilters';
import CarFilters from './CategoryFilers/CarFilters';
import ServiceFilters from './CategoryFilers/ServiceFilters';
import DeleteIcon from '@mui/icons-material/Delete';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  additionalFilters: Record<string, string | number>;
  setAdditionalFilters: (filters: Record<string, string | number>) => void;
  isAuthenticated?: boolean;
}

const SEARCH_HISTORY_KEY = 'searchHistory';

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  additionalFilters,
  setAdditionalFilters
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
    setSearchHistory(savedHistory);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch.trim()) {
        setSearchTerm(localSearch);
        updateSearchHistory(localSearch);
      } else {
        setSearchTerm('');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchTerm]);

  // 📌 Функция обновления истории поиска (хранит только последние 3 записи)
  const updateSearchHistory = (newSearch: string) => {
    setSearchHistory((prevHistory) => {
      const updatedHistory = [newSearch, ...prevHistory.filter((item) => item !== newSearch)].slice(0, 3);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  // 📌 Очистка конкретного элемента истории
  const removeHistoryItem = (itemToRemove: string) => {
    setSearchHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter((item) => item !== itemToRemove);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3, position: 'relative' }}>
      <TextField
        label="Поиск"
        variant="outlined"
        fullWidth
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // ⏳ Задержка перед скрытием списка
        autoComplete="off"
      />

      {/* 📌 Выпадающие предложения как в Google/Yandex */}
      {showSuggestions && searchHistory.length > 0 && (
        <Paper 
          sx={{ 
            position: 'absolute', 
            top: 50, 
            left: 0, 
            width: '100%', 
            zIndex: 10, 
            borderRadius: 1, 
            overflow: 'hidden' 
          }}
        >
          <List>
            {searchHistory.map((item, index) => (
              <ListItem 
                key={index} 
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }} 
                onMouseDown={() => setLocalSearch(item)} // 🏆 Чтобы клик выбирал слово
              >
                <ListItemText primary={item} />
                <IconButton size="small" onClick={() => removeHistoryItem(item)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <FormControl fullWidth>
        <InputLabel>Категория</InputLabel>
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} label="Категория">
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="Недвижимость">Недвижимость</MenuItem>
          <MenuItem value="Авто">Авто</MenuItem>
          <MenuItem value="Услуги">Услуги</MenuItem>
        </Select>
      </FormControl>

      {categoryFilter === 'Недвижимость' && <PropertyFilters additionalFilters={additionalFilters} setAdditionalFilters={setAdditionalFilters} />}
      {categoryFilter === 'Авто' && <CarFilters additionalFilters={additionalFilters} setAdditionalFilters={setAdditionalFilters} />}
      {categoryFilter === 'Услуги' && <ServiceFilters additionalFilters={additionalFilters} setAdditionalFilters={setAdditionalFilters} />}
    </Box>
  );
};

export default Filters;
