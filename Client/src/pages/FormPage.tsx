import React, { useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CategorySelector from '../components/CategorySelector';
import PropertyFields from '../components/CategoryFields/PropertyFields';
import CarFields from '../components/CategoryFields/CarFields';
import ServiceFields from '../components/CategoryFields/ServiceFields';
import useDraft from '../hooks/useDraft';
import { createItem, updateItem, fetchItemById } from '../api/api';
import { validateAdForm } from '../components/Validation/adValidation';
import { isValidImageUrl } from '../components/Validation/validateImage';
import avitoLogo from '../assets/avito-logo.svg';

const initialFormData = {
    name: '',
    description: '',
    location: '',
    type: '',
    image: '',
    price: '',
    propertyType: '',
    area: '',
    rooms: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    serviceType: '',
    experience: '',
    workSchedule: '',
};

const FormPage: React.FC = () => {
    const { formData, setFormData, clearDraft } = useDraft(initialFormData);
    const navigate = useNavigate();
    const { id } = useParams();

    const placeholderImage = 'https://steamuserimages-a.akamaihd.net/ugc/2079019457927111911/45068F1A462AF6EB757ADABDD621AB5FDE49E38E/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true';

    useEffect(() => {
        if (id) {
            fetchItemById(id).then((data) => {
                if (data) {
                    setFormData(data);
                }
            }).catch((error) => {
                console.error('Ошибка загрузки объявления:', error);
            });
        }
    }, [id, setFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const validationError = validateAdForm(formData);
        if (validationError) {
            alert(validationError);
            return;
        }

        try {
            const itemData = {
                ...formData,
                image: isValidImageUrl(formData.image) ? formData.image : placeholderImage,
            };

            if (id) {
                await updateItem(id, itemData);
            } else {
                await createItem(itemData);
            }

            clearDraft(); 
            setFormData({ ...initialFormData }); 

            setTimeout(() => {
                navigate('/');
            }, 100);
        } catch (error) {
            console.error('Ошибка при сохранении объявления:', error);
        }
    };

    const handleClearForm = () => {
        clearDraft(); 
        setFormData({ ...initialFormData }); 
    };

    return (
        <Container sx={{ mt: 2, mb: 3, px: 2 }}>
            <img 
                onClick={() => navigate('/')} 
                src={avitoLogo} 
                alt="Avito Logo" 
                style={{ width: '150px', height: 'auto', marginBottom: '15px', cursor: 'pointer' }} 
            />
            <Typography 
                sx={{ mb: 5, fontFamily: 'Manrope', fontSize: { xs: '24px', sm: '32px' }, fontWeight: '700' }} 
                variant="h4"
            >
                {id ? 'Редактирование' : 'Новое объявление'}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 1, sm: 1.5 },
                    width: '100%',
                    maxWidth: '606px',
                }}
            >
                <TextField label="Название" name="name" value={formData.name} onChange={handleChange} required fullWidth />
                <TextField label="Описание" name="description" value={formData.description} onChange={handleChange} required multiline rows={5} fullWidth />
                <TextField label="Локация" name="location" value={formData.location} onChange={handleChange} required fullWidth />
                <TextField label="Фото (URL)" name="image" value={formData.image} onChange={handleChange} fullWidth />
                <TextField label="Цена" name="price" type="number" value={formData.price} onChange={handleChange} required fullWidth />

                <CategorySelector value={formData.type} onChange={handleChange} />

                {formData.type === 'Недвижимость' && (
                    <PropertyFields
                        propertyType={formData.propertyType}
                        area={formData.area}
                        rooms={formData.rooms}
                        setFormData={setFormData}
                    />
                )}

                {formData.type === 'Авто' && (
                    <CarFields
                        brand={formData.brand}
                        model={formData.model}
                        year={formData.year}
                        mileage={formData.mileage}
                        setFormData={setFormData}
                    />
                )}

                {formData.type === 'Услуги' && (
                    <ServiceFields
                        serviceType={formData.serviceType}
                        experience={formData.experience}
                        workSchedule={formData.workSchedule}
                        setFormData={setFormData}
                    />
                )}

                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleClearForm} 
                    sx={{ width: '100%' }}
                >
                    Очистить форму
                </Button>

                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmit} 
                    sx={{ width: '100%' }}
                >
                    {id ? 'Сохранить изменения' : 'Создать объявление'}
                </Button>
            </Box>
        </Container>
    );
};

export default FormPage;
