import express from "express";
import * as dotenv from "dotenv";
import router from "./app/router.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(router);

app.listen(port, () => console.log("Le serveur est en écoute @ http://localhost:"+port))