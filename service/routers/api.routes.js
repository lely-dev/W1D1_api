import { Router } from "express";
import User from "../models/user.model.js";

export const apiRoute = Router();


// Richiesta GET AUTHORS
apiRoute.get('/', async (req, res) => {
    res.send('Hello World!')
})


  //Richiesta POST
apiRoute.post("/", async (req, res, next) => {
try {
    let user = await User.create(req.body);

    res.send(user).status(400);
} catch (err) {

    next(err);
}
});


//RICHIESTA GET AUTHOR
apiRoute.get("/:id", async (req, res, next) => {
    try {

      let user = await User.findById(req.params.id);
        
      res.send(user);
    } catch (err) {

      next(err);
    }
  });


  //Richiesta PUT AUTHOR
  apiRoute.put("/:id", async (req, res, next) => {
    try {
     
      let user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(user);
    } catch (err) {

      next(err);
    }
  });


  //Richiesta DELETE Author
  apiRoute.delete("/:id", async (req, res, next) => {
    try {
      
      await User.deleteOne({
        _id: req.params.id,
      });
     
      res.send("L'utente è stato eliminato correttamente").status(204);
    } catch (err) {
      
      next(err);
    }
  });