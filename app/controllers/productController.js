import Product from "../models/Product.js";

const productController = {
    showProduct: async (req, res) => {
        try {
            const productId = req.params.id

            const productData = await Product.findOne({where: {id: productId}})
            if (!productData) {
                throw new Error("La page demandée n'existe pas")
            }
            res.render('details', {product : productData})
            
        }
        catch(error){
            res.render("error", {message: error.message})
        }
    },

    addProduct: (req, res) => {
        res.render('addProduct')
    },

    addProductAction: async (req, res) => {
        try {
            const newProduct = await Product.create({name : req.body.name, description : req.body.description, weight: req.body.weight, price: req.body.price})
            if (!newProduct){
                throw new Error("Le produit n'a pas pu être créé.")
            }
            res.render('details', {product : newProduct})
        }
        catch(error) {
            res.render('error', {alert :error.message});
        }
    },
};

export default productController;