import AxiosIntance from "../../axios/axios";
import { IUsers } from "../../interfaces/IUser";

class Credential extends AxiosIntance<IUsers> {
    config() {
        return 'user/credential_lookup'
    }
}

export default Credential