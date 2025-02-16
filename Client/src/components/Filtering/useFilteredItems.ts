import { useEffect, useState } from 'react';

const useFilteredItems = (
  items: any[],
  searchTerm: string,
  categoryFilter: string,
  additionalFilters: any,
  myItemsOnly: boolean,
  user: any
) => {
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    let filtered = [...items];

    if (searchTerm) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (categoryFilter && categoryFilter !== "Все") {
      filtered = filtered.filter(item => item.type === categoryFilter);
    }

    if (categoryFilter === 'Недвижимость') {
      if (additionalFilters.propertyType && additionalFilters.propertyType !== "Все") {
        filtered = filtered.filter(item => item.propertyType === additionalFilters.propertyType);
      }
      if (additionalFilters.rooms) {
        filtered = filtered.filter(item => item.rooms >= Number(additionalFilters.rooms));
      }
      if (additionalFilters.area) {
        filtered = filtered.filter(item => item.area >= Number(additionalFilters.area));
      }
    }

    if (categoryFilter === 'Авто') {
      if (additionalFilters.brand && additionalFilters.brand !== "Все") {
        filtered = filtered.filter(item => item.brand === additionalFilters.brand);
      }
      if (additionalFilters.model) {
        filtered = filtered.filter(item => item.model.toLowerCase().includes(additionalFilters.model.toLowerCase()));
      }
      if (additionalFilters.year) {
        filtered = filtered.filter(item => item.year >= Number(additionalFilters.year));
      }
    }

    if (categoryFilter === 'Услуги') {
      if (additionalFilters.serviceType && additionalFilters.serviceType !== "Все") {
        filtered = filtered.filter(item => item.serviceType === additionalFilters.serviceType);
      }
      if (additionalFilters.experience) {
        filtered = filtered.filter(item => item.experience >= Number(additionalFilters.experience));
      }
      if (additionalFilters.workSchedule && additionalFilters.workSchedule !== "Все") {
        filtered = filtered.filter(item => item.workSchedule === additionalFilters.workSchedule);
      }
    }

    if (myItemsOnly && user) {
      filtered = filtered.filter(item => item.userId?._id === user.id);
    }

    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter, myItemsOnly, additionalFilters, items, user]);

  return filteredItems;
};

export default useFilteredItems;
