import { Router } from "express";
import User from "../models/user.model.js";
import cloudinaryAvatar from '../middlewares/multer.avatar.js'

export const authorsRoute = Router();


// Richiesta GET AUTHORS
authorsRoute.get('/', async (req, res) => {
    res.send('sono nella lista autori')
})


  //Richiesta POST
//   authorsRoute.post("/", async (req, res, next) => {
// try {
//     let user = await User.create(req.body);

//     res.send(user).status(400);
//     console.log('ho fatto un post autori');
// } catch (err) {

//     next(err);
// }
// });

authorsRoute.get("/me", async (req, res, next) => {
 
  try {
    let user = await User.findById(req.user.id);

    res.send(user);
  } catch (err) {
    next(err);
  }
});


//RICHIESTA GET AUTHOR
authorsRoute.get("/:id", async (req, res, next) => {
    try {

      let user = await User.findById(req.params.id);
        
      res.send(user);
      console.log('sono all ID autore')
    } catch (err) {

      next(err);
    }
  });


  //Richiesta PUT AUTHOR
  authorsRoute.put("/:id", async (req, res, next) => {
    try {
     
      let user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(user);
      console.log('modifico l autore')
    } catch (err) {

      next(err);
    }
  });


  //Richiesta DELETE Author
  authorsRoute.delete("/:id", async (req, res, next) => {
    try {
      
      await User.deleteOne({
        _id: req.params.id,
      });
     
      res.send("L'autore è stato eliminato").status(204);
    } catch (err) {
      
      next(err);
    }
  });


  // RICHIESTA PATCH IMG AVATAR
  authorsRoute.patch("/:id/avatar", cloudinaryAvatar, async (req, res, next) => {
    try {
      let updateAvatarUser = await User.findByIdAndUpdate(
        req.params.id,
        { avatar: req.file.path },
        { new: true }
      );

      res.send(updateAvatarUser);
    } catch (error) {

      next(error);
    }
  });
  