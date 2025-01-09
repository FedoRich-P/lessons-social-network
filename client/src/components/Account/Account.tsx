import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../../api/Users.ts';
import { queryClient } from '../../api/queryClient.ts';
import { Loader } from '../Loader';
import { PostForm } from '../PostForm';
import { AuthForm } from '../AuthForm';

export const Account = () => {
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ['users', ' me'],
    },
    queryClient
  );

  switch (meQuery.status) {
    case 'pending': {
      return <Loader />;
    }
    case 'success': {
      return <PostForm />;
    }
    case 'error': {
      return <AuthForm />;
    }
  }
};
