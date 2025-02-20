import { useLocation } from "react-router-dom";

type returnType<T> = T extends Object
    ? T | null
    : any

const useGetParam = <state = any>(type: "state" | "search", searchParam?: string): returnType<state> => {
    const location = useLocation()

    if (type == "search") {
        const queryParams = new URLSearchParams(location.search)
        return queryParams.get(searchParam!) as returnType<state>;
    }
    else if (type == "state") {
        return location.state ? location.state as returnType<state> : null as returnType<state>
    }

    return null as returnType<state>
}

export default useGetParam