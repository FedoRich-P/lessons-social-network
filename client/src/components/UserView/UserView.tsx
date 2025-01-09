import { getColorIndexByUsername, getColorByIndex, getGradientByIndex } from './getColorByUsername';
import './UserView.css';
import { User } from '../../api/Users.ts';
import { useLogout } from '../LoginForm/useLogout.tsx';

export type UserViewProps = {
  user: User;
};

export const UserView = ({ user }: UserViewProps) => {
  const colorIndex = getColorIndexByUsername(user.username);
  const logout = useLogout();

  return (
    <div className="user-view">
      <div className="user-view__avatar" style={{ background: getGradientByIndex(colorIndex) }}>
        {user.username.slice(0, 1).toUpperCase()}
      </div>

      <span className="user-view__username" style={{ color: getColorByIndex(colorIndex) }}>
        {user.username}
      </span>

      <button onClick={() => logout()}>Выйти</button>
    </div>
  );
};
