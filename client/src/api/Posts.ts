import { z } from 'zod';
import { useEffect, useState } from 'react';
import { validateResponse } from './validateResponse.ts';

export const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
});

export type Post = z.infer<typeof PostSchema>;

export const Posts = z.array(PostSchema);
export type Posts = z.infer<typeof Posts>;

export const FetchPostSchema = z.object({
  list: Posts,
});
export type FetchPostResponse = z.infer<typeof FetchPostSchema>;

export async function fetchPosts(): Promise<FetchPostResponse> {
  const res = await fetch('api/posts');
  const data = await res.json();
  return FetchPostSchema.parse(data);
}

type IdleRequestState = {
  status: 'idle';
};
type LoadingRequestState = {
  status: 'pending';
};
type SuccessRequestState = {
  status: 'success';
  data: Posts;
};
type ErrorRequestState = {
  status: 'error';
  error: Error;
};

type RequestState = IdleRequestState | LoadingRequestState | ErrorRequestState | SuccessRequestState;

export function usePosts() {
  const [state, setState] = useState<RequestState>({ status: 'idle' });

  useEffect(() => {
    if (state.status === 'pending') {
      fetchPosts()
        .then((data) => setState({ status: 'success', data: data.list }))
        .catch((error) => setState({ status: 'error', error: error.message }));
    }
  }, [state]);

  useEffect(() => {
    setState({ status: 'pending' });
  }, []);

  const reFetch = () => {
    setState({ status: 'pending' });
  };

  return { state, reFetch };
}

export function createPost(text: string): Promise<void> {
  return fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
    .then(validateResponse)
    .then(() => {});
}
