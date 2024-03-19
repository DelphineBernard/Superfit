import Product from "../models/Product.js";

const mainController = {
    home: async (req, res) => {
        const products = await Product.findAll()
        res.render('home', {products : products})
    },

    showProfile: (req, res) => {
        res.render('profile', {user : res.locals.user, role : res.locals.role})
    }
}

export default mainController;