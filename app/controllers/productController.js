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
            const userId = req.session.user_id
            const newProduct = await Product.create({name : req.body.name, description : req.body.description, weight: req.body.weight, price: req.body.price, user_id: userId})
            if (!newProduct){
                throw new Error("Le produit n'a pas pu être créé.")
            }
            res.render('details', {product : newProduct})
        }
        catch(error) {
            res.render('error', {message: error.message});
        }
    },

    deleteProductAction: async(req, res) => {
        try {
            const productId = req.params.id
            await Product.destroy({where: {id: productId}})
            // if (!productToDelete){
            //     throw new Error("Impossible de supprimer le produit.")
            // }
            res.json(`Le produit a bien été supprimé.`)
            res.redirect('/')
        }
        catch(error) {
            res.render('error', {message: error.message})
        }
    },

    showAllProducts: async (req, res) => {
        const products = await Product.findAll();
        res.json({products})
        console.log({products})
    },

    showOneProduct: async (req, res) => {
        const productId = req.params.id
        const productData = await Product.findOne({where: {id: productId}});
        res.json({productData})
    },
};

export default productController;