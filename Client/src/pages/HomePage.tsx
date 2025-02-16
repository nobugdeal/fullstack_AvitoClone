import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import { getCurrentUser } from '../api/api';
import useGetItems from '../hooks/useGetItems';
import ItemList from '../components/ItemList';
import Filters from '../components/Filtering/Filters';
import useFilteredItems from '../components/Filtering/useFilteredItems';
import avitoLogo from '../assets/avito-logo.svg';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { items, loading, error } = useGetItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [additionalFilters, setAdditionalFilters] = useState<Record<string, string | number>>({});
  const [page, setPage] = useState(() => Number(localStorage.getItem('currentPage')) || 1);
  const [user] = useState(getCurrentUser());

  const [myItemsOnly, setMyItemsOnly] = useState<boolean>(() => {
    return localStorage.getItem('myItemsOnly') === 'true';
  });

  useEffect(() => {
    const syncState = () => {
      setMyItemsOnly(localStorage.getItem('myItemsOnly') === 'true');
    };
    window.addEventListener('myItemsOnlyChange', syncState);
    return () => window.removeEventListener('myItemsOnlyChange', syncState);
  }, []);

  const filteredItems = useFilteredItems(items, searchTerm, categoryFilter, additionalFilters, myItemsOnly, user);

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setPage(1);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
    localStorage.setItem('currentPage', value.toString());
  };

  const navigate = useNavigate();

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setAdditionalFilters({});
    setPage(1);
    localStorage.removeItem('currentPage');
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
        <img onClick={() => navigate('/')} src={avitoLogo} alt="Avito Logo" style={{ width: '150px', height: 'auto', marginBottom: '15px', cursor: 'pointer' }} />
        <Typography variant="h4" sx={{ fontFamily: 'Manrope', fontWeight: '700', fontSize: '32px' }}>
          Список объявлений
        </Typography>
      </Box>

      {loading ? <CircularProgress /> : error ? <Alert severity="error">{error}</Alert> : (
        <>
          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={handleCategoryChange}
            additionalFilters={additionalFilters}
            setAdditionalFilters={setAdditionalFilters}
            isAuthenticated={!!user}
          />

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleResetFilters}
            sx={{ mb: 3 }}
          >
            Сбросить фильтры
          </Button>

          <ItemList
            items={filteredItems.slice((page - 1) * 5, page * 5)}
            page={page}
            totalPages={Math.ceil(filteredItems.length / 5)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

export default HomePage;
