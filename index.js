import express from "express";
import * as dotenv from "dotenv";
import router from "./app/router.js";
import pageNotFound from "./app/middlewares/pageNotFound.js";
import session from "express-session";
import cors from "cors";
import saveUserData from "./app/middlewares/saveUserData.js";


dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors()); 
app.use(express.json());

app.set('view engine', 'ejs');                                  
app.set('views', './app/views'); 

app.use(express.static('./assets'));

app.use(express.urlencoded({extended: true}));

app.use(session({                                                 
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,                                  
}));

app.use(saveUserData);

app.use(router);

app.use(pageNotFound);

app.listen(port, () => console.log("Le serveur est en écoute @ http://localhost:"+port))