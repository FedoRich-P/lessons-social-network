import {z} from "zod";
import {useEffect, useState} from "react";

// export type Post = {
//     id: string
//     text: string
//     authorId: string
//     createdAt: number
// }

// export type Posts = Post[]

// function isPost(data: unknown): data is Post {
//     return (
//         typeof data === 'object' && data !== null
//         && "id" in data && typeof data.id === 'string'
//         && "text" in data && typeof data.text === 'string'
//         && "authorId" in data && typeof data.authorId === 'string'
//         && "createdAt" in data && typeof data.createdAt === 'number'
//     );
// }

export const PostSchema = z.object({
    id: z.string(),
    text: z.string(),
    authorId: z.string(),
    createdAt: z.number(),
})

export type Post = z.infer<typeof PostSchema>

export const Posts = z.array(PostSchema)
export type Posts = z.infer<typeof Posts>

export const FetchPostSchema = z.object({
    list: Posts
})
export type FetchPostResponse = z.infer<typeof FetchPostSchema>

export function fetchPosts(): Promise<FetchPostResponse> {
    return fetch('api/posts')
        .then(res => res.json())
        .then(data => FetchPostSchema.parse(data));
}

type IdleRequestState = {
    status: "idle"
}
type LoadingRequestState = {
    status: "pending"
}
type SuccessRequestState = {
    status: "success"
    data: Posts
}
type ErrorRequestState = {
    status: "error"
    error: Error
}

type RequestState = IdleRequestState | LoadingRequestState | ErrorRequestState | SuccessRequestState

export function usePosts() {
    const [state, setState] = useState<RequestState>({status: "idle"})

    useEffect(() => {
        if (state.status === "pending") {
            fetchPosts()
                .then(data => setState({status: "success", data: data.list}))
                .catch(error => setState({status: "error", error: error.message}))
        }
    }, [state])

    useEffect(() => {
        setState({status: "pending"})
    }, [])

    const reFetch = () => {
        setState({status: "pending"})
    }

    return {state, reFetch}
}
