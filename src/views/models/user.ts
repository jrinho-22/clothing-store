import AxiosIntance from "../../axios/axios";
import { IUsers } from "../../interfaces/IUser";

class User extends AxiosIntance<IUsers> {
    config() {
        return 'user'
    }
}

export default User