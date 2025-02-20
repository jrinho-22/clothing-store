import { avaliacoesSeed } from "../schemas/avaliacoes"
import { categoriaSeed } from "../schemas/categoria"
import { collectionSeed } from "../schemas/collection"
import { produtoSeed } from "../schemas/produto"
import { transactionSeed } from "../schemas/transaction"
import { userSeed } from "../schemas/users"

const seed = async () => {
    try {
        await userSeed()
        await categoriaSeed()
        await collectionSeed()
        await produtoSeed()
        // await avaliacoesSeed()
        // await transactionSeed()
    } catch (error) {
        console.log(error, 'error seeding')
    }

}

export default seed
