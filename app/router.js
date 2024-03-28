import express from "express";
import productController from "./controllers/productController.js";
import mainController from "./controllers/mainController.js";
import authController from "./controllers/authController.js";
import isLogged from "./middlewares/isLogged.js";
import isAdmin from "./middlewares/isAdmin.js";
import cors from "cors";

const router = express.Router();

router.get('/', mainController.home);

router.get('/products/add', isAdmin, productController.addProduct)
router.post('/products/add', isAdmin, productController.addProductAction)

router.delete('/products/:id', cors(), productController.deleteProductAction)
router.get('/products/:id', productController.showProduct)


router.get('/login', authController.loginPage)
router.post('/login', authController.loginAction)

router.get('/signup', authController.signupPage)
router.post('/signup', authController.signupAction)

router.get('/logout', isLogged, authController.logoutAction)

router.get('/profile', isLogged, mainController.showProfile)

router.get('/api/products', cors(), productController.showAllProducts)
router.get('/api/products/:id',cors(), productController.showOneProduct)

export default router;