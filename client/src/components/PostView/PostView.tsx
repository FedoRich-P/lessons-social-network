import './PostView.css';
import { Post } from '../../api/Posts.ts';
import { FetchUserView } from '../UserView';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
}

export type PostViewProps = {
  post: Post;
  onDelete: (postId: string) => void;
};

export const PostView = ({ post, onDelete }: PostViewProps) => {
  return (
    <div className="post-view">
      <FetchUserView userId={post.authorId} />
      <p className="post-view__text">{post.text}</p>

      <time className="post-view__time">{formatDate(post.createdAt)}</time>
      <button onClick={() => onDelete(post.id)}>Удалить</button>
    </div>
  );
};
