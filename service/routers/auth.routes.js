import { Router } from "express";
import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../middlewares/authentication.js";

export const authRouter = Router();


// LOGIN PAGE
authRouter.get("/", async (req, res, next) => {
    res.send("Login Page");
  });
  
  // POST PER REGISTRARE L'UTENTE
  authRouter.post("/register", async (req, res, next) => {
    try {

      let newUser = await user.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10),
      });
  
      res.send(newUser);

    } catch (err) {
      next(err);
    }
  });


  // POST PER IL LOGIN DELL'UTENTE PRECEDENTEMENTE REGISTRATO
authRouter.post("/login", async (req, res, next) => {
    try {
      // RICERCA L'UTENTE CON USERNAME
      let findUser = await user.findOne({
        username: req.body.username,
      });
  
      // SE TROVIAMO L'UTENTE CONTROLLO DELLA PASSWORD
      if (findUser) {
        const passwordCorrect = await bcrypt.compare(
          req.body.password,
          findUser.password
        );
  
        // SE LA PASSWORD COINCIDE GENERIAMO IL TOKEN
        if (passwordCorrect) {
          const token = await generateJWT({
            username: findUser.username,
          });
  
   
          res.send({ user: findUser, token });
        } else {
          res.status(400).send("Password errata");
        }
      } else {
        res.status(400).send("Utente non trovato");
      }
    } catch (err) {
      next(err);
    }
  });
  
  