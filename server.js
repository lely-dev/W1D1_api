import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { apiRoute } from "./service/routers/api.routes.js";
const app = express()
const port = 3010
config()

//per abilitare i dati json
app.use(express.json());

// per utilizzare la route
app.use("/authors", apiRoute);


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