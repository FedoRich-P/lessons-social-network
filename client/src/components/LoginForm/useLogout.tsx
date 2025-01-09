import { useMutation } from '@tanstack/react-query';
import { logout } from '../../api/Users.ts';
import { queryClient } from '../../api/queryClient.ts';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const logoutMutation = useMutation(
    {
      mutationFn: logout,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] }).then(() => {});
        navigate('/login');
      },
    },
    queryClient
  );

  return () => logoutMutation.mutate();
};
