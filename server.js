import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { authorsRoute } from "./service/routers/author.routes.js";
import { blogRoute } from "./service/routers/blog.routes.js";
import { authMiddleware } from "./service/middlewares/authentication.js";
import {authRouter} from "./service/routers/auth.routes.js";
const app = express()
const port = 3010
config()

//per abilitare i dati json
app.use(express.json());

// per utilizzare la route
app.use("/authors", authMiddleware,  authorsRoute);
app.use("/blogPosts", authMiddleware, blogRoute)
app.use("/auth", authRouter)

//connessione per il frontend
app.use(cors());


//Connessione al server
const initserver = async () => {

    try {
        await mongoose.connect(process.env.APIDB);

        console.log("Connessione riuscita");
        
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          })
    } catch (err) {
        console.error("Connessione fallita", err);
    }

}

//Invocare la funzione per il server
initserver()