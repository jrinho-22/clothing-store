import AxiosIntance from "../../axios/axios";
import { ICollection } from "../../interfaces/ICollection";
import { IProduto } from "../../interfaces/IProduct";

class Produto extends AxiosIntance<IProduto> {
    config() {
        return 'produto'
    }
}

export default Produto