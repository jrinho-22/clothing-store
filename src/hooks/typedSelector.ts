import { useSelector } from "react-redux";
import { rootState } from "../store/store";

export const useTypesSeletor = <T>(callback: (state: rootState) => T):T => {
    return useSelector(callback);
}