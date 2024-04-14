import express from "express";
import * as dotenv from "dotenv";
import router from "./app/router.js";
import pageNotFound from "./app/middlewares/pageNotFound.js";
import session from "express-session";
import saveUserData from "./app/middlewares/saveUserData.js";
// Config redis utilisé pour le déploiement sur render.com
// import { createClient } from 'redis';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

// const client = createClient({
//     url: process.env.REDIS_URL
// });

// client.on('error', (err) => console.log('Redis Client Error', err));

app.use(express.json());

app.set('view engine', 'ejs');                                  
app.set('views', './app/views'); 

app.use(express.static('./assets'));

app.use(express.urlencoded({extended: true}));

app.use(session({
    // store: redisStore,                                          
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,                                  
}));

app.use(saveUserData);

app.use(router);

app.use(pageNotFound);

app.listen(port, () => console.log("Le serveur est en écoute @ http://localhost:"+port))