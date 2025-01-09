import { PostView } from '../PostView';
import './PostListView.css';
import { deletePost, Posts } from '../../api/Posts.ts';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient.ts';

export type PostListView = {
  postList: Posts;
};

export const PostListView = ({ postList }: PostListView) => {
  const deletePostMutation = useMutation(
    {
      mutationFn: deletePost,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['posts'] }).then(() => {});
      },
    },
    queryClient
  );

  const handleDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId);
  };

  return (
    <ul className="post-list">
      {postList.map((post) => (
        <li key={post.id} className="post-list__item">
          <PostView post={post} onDelete={handleDeletePost} />
        </li>
      ))}
    </ul>
  );
};
