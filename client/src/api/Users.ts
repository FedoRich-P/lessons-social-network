import { z } from 'zod';
import { validateResponse } from './validateResponse.ts';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      return res.json();
    })
    .then((user) => UserSchema.parse(user));
}

export function registerUser(body: { password: string; username: string }): Promise<void> {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(() => {});
}

export function login(body: { password: string; username: string }): Promise<void> {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(validateResponse)
    .then(() => {});
}

export function fetchMe(): Promise<User> {
  return fetch('/api/users/me')
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}
