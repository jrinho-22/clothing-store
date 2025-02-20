import { baseURL } from "../helpers/conts";

const axiosConfig = {
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
}

export default axiosConfig