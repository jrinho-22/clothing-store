import AxiosIntance from "../../axios/axios";
import { ICollection, ICollectionNew } from "../../interfaces/ICollection";

class Collection extends AxiosIntance<ICollection> {
    config() {
        return 'collection'
    }

    async getValidCollections(): Promise<ICollectionNew[] | []> {
        const today = new Date();
        const tenDaysAgo = new Date(new Date().setDate(today.getDate() - 10));
        try {
            const response = await this._apiClient.get<ICollection[]>(this._resource);
            const activeCollections = response.data
                .filter(coll => (new Date(coll.lancamento) <= today))
                .slice(0, 3)
                .map(coll => (
                    {
                        ...coll,
                        new: (new Date(coll.lancamento) >= tenDaysAgo)
                    }));

            return activeCollections;
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

export default Collection