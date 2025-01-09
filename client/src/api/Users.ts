import {z} from "zod";

export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
})

export type User = z.infer<typeof UserSchema>

export function fetchUser(id: string): Promise<User> {
    return fetch(`/api/users/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            return res.json();
        })
        .then(user => UserSchema.parse(user));
}
    // return (
    //     fetch(`/api/users/${id}`)
    //     .then(res => res.json())
    //     .then(user => UserSchema.parse(user))
    // )
// }