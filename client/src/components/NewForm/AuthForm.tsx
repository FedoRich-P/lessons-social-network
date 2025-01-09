import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { registerUser, login, fetchMe } from '../../api/Users.ts';
import { useLogout } from '../LoginForm/useLogout.tsx';

const RegisterSchema = z.object({
  username: z.string().min(5, 'Имя пользователя должно содержать не менее 5 символов'),
  password: z.string().min(8, 'Пароль должен содержать не менее 8 символов'),
});

const LoginSchema = z.object({
  username: z.string().min(5, 'Имя пользователя должно содержать не менее 5 символов'),
  password: z.string().min(8, 'Пароль должен содержать не менее 8 символов'),
});

type AuthFormProps = {
  type: 'login' | 'register';
};

export const AuthForm = ({ type }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string }>({
    resolver: zodResolver(type === 'login' ? LoginSchema : RegisterSchema),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const logout = useLogout();

  const onSubmit: SubmitHandler<{ username: string; password: string }> = async (data) => {
    try {
      if (type === 'register') {
        await registerUser(data);
      } else {
        await login(data);
      }

      const user = await fetchMe();
      setCurrentUser(user.username);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  if (isAuthenticated && currentUser) {
    return (
      <Box textAlign="center">
        <Typography variant="h5">Добро пожаловать, {currentUser}!</Typography>
        <Button variant="contained" color="secondary" onClick={logout}>
          Выйти
        </Button>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: 'auto', marginTop: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {type === 'login' ? 'Вход' : 'Регистрация'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Имя пользователя"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </form>
    </Paper>
  );
};
