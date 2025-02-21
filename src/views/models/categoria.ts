import AxiosIntance from "../../axios/axios";
import { ICategoria } from "../../interfaces/ICategoria";

class Categoria extends AxiosIntance<ICategoria> {
    config() {
        return 'categoria'
    }

    async getParentCategories(): Promise<ICategoria[] | []> {
        const response = await this._apiClient.get<ICategoria[]>(this._resource);
        const parentCat = response.data.filter(cat => !cat.parentCategory)
            return parentCat
    }

    async getSubCategories(): Promise<ICategoria[] | []> {
        const response = await this._apiClient.get<ICategoria[]>(this._resource);
        const subCat = response.data.filter(cat => cat.parentCategory)
        return subCat
    }

    async getSubByParent(parent: string): Promise<ICategoria[] | []> {
        const response = await this._apiClient.get<ICategoria[]>(`${this._resource}/${parent}`);
        const subCat = response.data.filter(cat => cat.parentCategory)
        return subCat
    }
}

export default Categoria