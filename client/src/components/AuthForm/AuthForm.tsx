import { FC, useState } from 'react';
import { registerUser, login, fetchMe } from '../../api/Users.ts';
import { useLogout } from '../LoginForm/useLogout.tsx';
import { PostForm } from '../PostForm';
import { SegmentedSwitch, SegmentedSwitchOption } from '../SegmentedSwitch';

export const AuthForm: FC = () => {
  const [authType, setAuthType] = useState<'login' | 'registration'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const logout = useLogout();

  const handleAuth = async () => {
    try {
      if (authType === 'registration') {
        await registerUser({ username, password });
      } else {
        await login({ username, password });
      }

      // После успешной регистрации или входа получаем данные пользователя
      const user = await fetchMe();
      setCurrentUser(user.username);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  if (isAuthenticated && currentUser) {
    return (
      <div>
        <p>Добро пожаловать, {currentUser}!</p>
        <PostForm />
        <button onClick={logout}>Выйти</button>
      </div>
    );
  }

  return (
    <div className="auth-form">
      <SegmentedSwitch>
        <SegmentedSwitchOption
          title="Войти"
          isActive={authType === 'login'}
          onClick={() => setAuthType('login')}
        />
        <SegmentedSwitchOption
          title="Зарегистрироваться"
          isActive={authType === 'registration'}
          onClick={() => setAuthType('registration')}
        />
      </SegmentedSwitch>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
      >
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{authType === 'login' ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
    </div>
  );
};

// return (
//     <div className="auth-form">
//         <SegmentedSwitch>
//             <SegmentedSwitchOption
//                 title="Войти"
//                 isActive={authType === 'login'}
//                 onClick={() => setAuthType('login')}
//             />
//             <SegmentedSwitchOption
//                 title="Зарегистрироваться"
//                 isActive={authType === 'registration'}
//                 onClick={() => setAuthType('registration')}
//             />
//         </SegmentedSwitch>
//
//         {authType == 'login' ? <LoginForm /> : <RegistrationForm />}
//     </div>
// );
