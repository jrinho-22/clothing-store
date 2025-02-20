import { Produto } from "../schemas/produto";
import instance from "../server/server";

const app = instance.app

app.get('/produto', async (req, res) => {
    Produto.find().then((produto) => {
        res.send(produto);
    }).catch(erro => {
        res.status(500).json({
            message: "An error occurred while retrieving the produto.",
            error: erro.message || "Unknown error"
        });
    })
}); 
