import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../../api/Users.ts";
import {queryClient} from "../../api/queryClient.ts";
import {Loader} from "../Loader";
import {UserView} from "./UserView.tsx";

type FetchUserViewProps = {
    userId: string;
}

export const FetchUserView = ({userId}: FetchUserViewProps) => {
    const userQuery = useQuery({
            queryFn: () => fetchUser(userId),
            queryKey: ['users', userId]
        },
        queryClient);

    switch (userQuery.status) {
        case "pending": {
            return <Loader/>
        }
        case "success": {
            return <UserView user={userQuery.data}/>
        }
        case "error": {
            return (
                <div>
                    <h2>Some Error</h2>
                    <button onClick={()=> userQuery.refetch()}>Перезагрузить</button>
                </div>
            )

        }
    }
};