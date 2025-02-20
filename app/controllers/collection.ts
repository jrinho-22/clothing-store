import { Collection } from "../schemas/collection";
import instance from "../server/server";

const app = instance.app

app.get('/collection', async (req, res) => {
    //   instance.app.get('/collection', (req, res) => {
    // console.log('rannnnnn')
    // res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins (adjust for security)
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  // Allow certain methods
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // Allow specific headers
// });
    Collection.find().then((collection) => {
        res.send(collection);
    }).catch(erro => {
        res.status(500).json({
            message: "An error occurred while retrieving the collection.",
            error: erro.message || "Unknown error"
        });
    })
}); 
