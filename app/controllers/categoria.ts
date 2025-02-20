import { Categoria, findCatByParent } from "../schemas/categoria";
import { Produto } from "../schemas/produto";
import instance from "../server/server";

const app = instance.app

app.get('/categoria', async (req, res) => {
    Categoria.find().then((categoria) => {
        res.send(categoria);
    }).catch(erro => {
        res.status(500).json({
            message: "An error occurred while retrieving the categoria.",
            error: erro.message || "Unknown error"
        });
    })
})

app.get('/categoria/:id', async (req, res) => {
    findCatByParent(req.params.id).then(cat =>
        res.send(cat)
    ).catch(erro => {
        res.status(500).json({
            message: "An error occurred while retrieving the categoria.",
            error: erro.message || "Unknown error"
        });
    })
})
