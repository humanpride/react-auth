import React from 'react';
import Input from './Input';
import Button from '@material-ui/core/Button';
import SubmitContainer from './styles/SubmitContainer';

function ProfileView(props)
{
    let {profileData, formData, onChange, onBlur, onLogOut} = props;
    return (
        <div>
            <Input
                label="Имя"
                type="text"
                name="name"
                value={profileData['name']}
                onChange={onChange}
                onBlur={onBlur}
            />
            <Input
                label="Логин"
                type="text"
                name="login"
                value={profileData['login']}
                onChange={onChange}
                onBlur={onBlur}
            />
            <Input
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={profileData['email']}
                onChange={onChange}
                onBlur={onBlur}
                error={formData.validEmail ? false : true}
                helperMsg={formData.validEmail ? '' : 'Введите корректный Email'}
            />
            <Input
                label="Телефон"
                type="text"
                name="phone"
                value={profileData['phone']}
                onChange={onChange}
                onBlur={onBlur}
            />
            <Input
                label="Адрес"
                type="text"
                name="address"
                value={profileData['address']}
                onChange={onChange}
                onBlur={onBlur}
            />
            <Input
                label="Город"
                type="text"
                name="city"
                value={profileData['city']}
                onChange={onChange}
                onBlur={onBlur}
            />
            <Input
                label="Новый пароль"
                type='password'
                name="password"
                value={formData.password}
                onChange={onChange}
                error={formData.validPassword || formData.password === '' ? false : true}
                helperMsg={formData.validPassword || formData.password === '' ? '' : 'Пароль должен быть не менее 8 символов'}
            />
            <Input
                label="Повторите пароль"
                type="password"
                name="confirm"
                value={formData.confirm}
                onChange={onChange}
                error={formData.passConfirmed ? false : true}
                helperMsg={formData.passConfirmed || formData.password === '' ? '' : 'Пароли должны совпадать'}
            />
            <SubmitContainer>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onLogOut}
                >
                    Выйти
                </Button>
            </SubmitContainer>
        </div>
    );
}

export default ProfileView;
