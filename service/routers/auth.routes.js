import { Router } from "express";
import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../middlewares/authentication.js";
import { sendEmail } from "../../utils/sendMail.js";
import passport from "passport";

export const authRouter = Router();

// MESSAGGIO MAIL PER REGISTRAZIONE

const mailRegister = `<h1>You have successfully registered</h1>
<p>StriveBlog welcomes you to the platform.</>`;

const mailTitle = `<h1>Welcome to our family!</h1>`;

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
      
      sendEmail(mailRegister, req.body.email, mailTitle)
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


  // GET PER IL LOGIN TRAMITE GOOGLE
  authRouter.get("/googleLogin", passport.authenticate("google", {scope:["profile", "email"]}));

  authRouter.get("/callback", passport.authenticate("google", {session:false}), (req,res,next)=>{
    try {
      res.redirect(`http://localhost:3000/me?accessToken=${req.user.accessToken}`);
      
    } catch (error) {
      next(error);
    }
  });
  
  