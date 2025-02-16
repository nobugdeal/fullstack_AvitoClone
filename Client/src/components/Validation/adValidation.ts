export const validateAdForm = (formData: Record<string, any>): string | null => {
    if (!formData.name || !formData.description || !formData.location || !formData.type || !formData.price) {
        return 'Все поля обязательны для заполнения!';
    }

    if (!/^\d+$/.test(formData.price)) {
        return 'Цена должна содержать только цифры!';
    }

    if (formData.type === 'Недвижимость') {
        if (!formData.propertyType || !formData.area || !formData.rooms) {
            return 'Все поля недвижимости должны быть заполнены!';
        }
        if (!/^\d+$/.test(formData.area) || !/^\d+$/.test(formData.rooms)) {
            return 'Площадь и количество комнат должны быть числами!';
        }
    }

    if (formData.type === 'Авто') {
        if (!formData.brand || !formData.model || !formData.year || !formData.mileage) {
            return 'Все поля автомобиля должны быть заполнены!';
        }
        if (!/^\d+$/.test(formData.year) || !/^\d+$/.test(formData.mileage)) {
            return 'Год выпуска и пробег должны быть числами!';
        }
    }

    if (formData.type === 'Услуги') {
        if (!formData.serviceType || !formData.experience) {
            return 'Все поля услуг должны быть заполнены!';
        }
        if (!/^\d+$/.test(formData.experience)) {
            return 'Опыт работы должен быть числом!';
        }
    }

    return null;
};
