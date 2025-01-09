import { PostView } from '../PostView';
import './PostListView.css';
import { Posts } from '../../api/Posts.ts';

export type PostListView = {
  postList: Posts;
};

export const PostListView = ({ postList }: PostListView) => {
  return (
    <ul className="post-list">
      {postList.map((post) => (
        <li key={post.id} className="post-list__item">
          <PostView post={post} />
        </li>
      ))}
    </ul>
  );
};
