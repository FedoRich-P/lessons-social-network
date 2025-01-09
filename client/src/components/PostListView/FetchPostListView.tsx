import {fetchPosts} from "../../api/Posts.ts";
import {Loader} from "../Loader";
import {PostListView} from "./PostListView.tsx";
import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient.ts";

export const FetchPostListView = () => {
    const postsQuery = useQuery({
        queryFn: () => fetchPosts(),
        queryKey: ['posts']
    },
        queryClient);

    switch (postsQuery.status) {
        case "pending": {
            return <Loader/>
        }
        case "success": {
            return <PostListView postList={postsQuery.data.list}/>
        }
        case "error": {
            return (
                <div>
                    <h2>Some Error</h2>
                    <button onClick={()=> postsQuery.refetch()}>Перезагрузить</button>
                </div>
            )

        }
    }
};