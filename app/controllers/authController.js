import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import validator from "validator";

const authController = {
    signupPage: (req, res) => {
        res.render('signup')
    },

    signupAction: async (req, res) => {
        try {
            const options = {minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
            if (!validator.isStrongPassword(req.body.password, options)){
                throw new Error('Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
            }
            const isMatchPassword = req.body.password === req.body.password2
            if (!isMatchPassword){
                throw new Error("Les mots de passe doivent être identiques !")
            }
            const newUser = await User.create({email: req.body.email, password: req.body.password});
            console.log(newUser)
            if (!newUser){
                throw new Error("Les données saisies sont invalides")
            }
            res.redirect('/login')
        }
        catch(error){
            res.render('signup', {alert :error.message});
        }
    },

    loginPage: (req, res) => {
        res.render('login')
    },

    loginAction: async (req, res) => {
        try {
            const foundUser = await User.findOne({where: {email: req.body.email}});
            if (!foundUser){
                throw new Error("Mauvais couple identifiant / mot de passe.")
            }
            const isPasswordValid = await bcrypt.compare(req.body.password, foundUser.password);
            if (!isPasswordValid){
                throw new Error("Mauvais couple identifiant / mot de passe.")
            }
            req.session.isLogged = true;
            req.session.user = foundUser.email;
            req.session.user_id = foundUser.id


            // CODE POUR PASSER UN USER ADMIN
            const admin = await User.update({role_id: 2}, {
                where: {id: 1}
            });
            
            
            const userIsAdmin = foundUser.role_id === 2

            if (!userIsAdmin) {
                req.session.isAdmin = false;
            } else {
                req.session.isAdmin = true;
            }
            
            res.redirect('/profile')
        }
        catch(error) {
            res.render('login', {alert : error.message})
        }  
    },

    logoutAction: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },
};

export default authController;