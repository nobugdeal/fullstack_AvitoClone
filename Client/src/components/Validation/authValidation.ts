interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateLoginForm = (email: string, password: string): string | null => {
    if (!email.trim()) return 'Введите email.';
    if (!isValidEmail(email)) return 'Некорректный формат email.';
    if (!password.trim()) return 'Введите пароль.';
    if (password.length < 6) return 'Пароль должен содержать минимум 6 символов.';

    return null; 
};


const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-zА-Яа-я\d!@#$%^&*(),.?":{}|<>]{6,}$/;
    return passwordRegex.test(password);
};


const isValidUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Zа-яА-Я0-9_]{3,}$/;
    return usernameRegex.test(username);
};


export const validateRegisterForm = (formData: RegisterFormData) => {
    const errors: string[] = [];

    
    if (!formData.username.trim()) {
        errors.push('Введите имя пользователя.');
    } else if (!isValidUsername(formData.username)) {
        errors.push('Имя пользователя должно содержать минимум 3 символа и состоять только из букв, цифр и "_".');
    }

    
    if (!formData.email.trim()) {
        errors.push('Введите email.');
    } else if (!isValidEmail(formData.email)) {
        errors.push('Некорректный формат email.');
    }

    
    if (!formData.password.trim()) {
        errors.push('Введите пароль.');
    } else if (!isValidPassword(formData.password)) {
        errors.push('Пароль должен содержать минимум 6 символов, хотя бы 1 букву, 1 цифру и 1 символ.');
    }

    return errors;
};
