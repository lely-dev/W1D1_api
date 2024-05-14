import { Router } from "express";
import blog from "../models/blog.model.js";
import cloudinaryCover from '../middlewares/multer.cover.js'
import { sendEmail } from "../../utils/sendMail.js";
import User from "../models/user.model.js";

export const blogRoute = Router();

// GET LISTA DI BLOG POST
blogRoute.get('/', async (req, res) => {
    try {
        const blogs = await blog.find();
        res.json(blogs);
        
    } catch (error) {
        console.error("Errore durante il recupero dei blog:", error);
        res.status(500).json({ message: 'Errore durante il recupero dei blog' });
    }
})

//BLOG DELL'UTENTE REGISTRATO
blogRoute.get("/me", async (req, res, next) => {
 
    try {
     
        const blogs = await blog.find({author: req.user._id});

      res.send(blogs);
    } catch (err) {
      next(err);
    }
  });


// GET RITORNA UN COMMENTO DEL POST TRAMITE ID
blogRoute.get('/:id/comment/:id', async (req, res, next) => {
    try {
        let singolBlogComment = await blog.findById(req.params.id, req.body);

        res.send(singolBlogComment)
        console.log('sono al singolo commento')
    } catch (error) {
        next(error)
    }

})


// GET RITORNA TUTTI I COMMENTI DEL POST TRAMITE ID
blogRoute.get('/:id/comments', async (req, res, next) => {
    try {
        let commentsBlog = await blog.findById(req.params.id, req.body);

        res.send(commentsBlog)
        console.log('sono nei coomenti del Blog')
    } catch (error) {
        next(error)
    }

})


// GET DEL BLOG TRAMITE ID
blogRoute.get('/:id', async (req, res, next) => {
    try {
        let blogId = await blog.findById(req.params.id, req.body);

        res.send(blogId.populate("comment"));
        console.log('sono nel blog con ID');
    } catch (error) {
        next(error)
    }

})

// POST DEL COMMENTO AL BLOG TARMITE ID
blogRoute.post('/:id', async(req,res, next)=>{
    try {
        //CERCO IL BLOG CON L'ID
        let findBlog = await blog.findById(req.params.id);
        //CREO UN NUOVO COMMENTO
        const newComment = {author: req.user ? req.user._id : null,
            description: req.body.description};
        //FACCIO IL PUSH DEL NUOVO COMMENTO NEL BLOG E LO SALVO
        findBlog.comment.push(newComment);

        await findBlog.save();

        res.send(newComment).status(200);
        console.log('ho creato un nuovo commento al blog')
        
    } catch (error) {
        next(error)
    }
})

//MAIL DOPO IL POST DEL NUOVO BLOG

const mailNewBlog = `<h1>You have successfully uploaded the blog!</h1>
<p>Continue to publish content.</>`;

const mailNewBlogTitle = `<h1>New Content Created</h1>`;

// POST DEL NUOVO BLOG
blogRoute.post('/', async(req,res, next)=>{
    try {
        

        let newPost = await blog.create({...req.body, author: req.user._id});

        if(req.body.email){ sendEmail(mailNewBlog, req.body.email, mailNewBlogTitle);}

       
        
        res.send(newPost).status(200);
        console.log('ho fatto il post di un nuovo blog')
        
    } catch (error) {
        next(error)
    }
})




// PUT DEL COMMENTO NEL BLOG CON ID
blogRoute.put('/:id/comment/:id', async(req, res, next) =>{
    try {
        let modifyComment = await blog.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        });

        res.send(modifyComment);
        console.log('ho modificato il blog con ID')

    } catch (error) {
        next(error)
    }
})


// PUT DEL BLOG CON ID
blogRoute.put('/:id', async(req, res, next) =>{
    try {
        let modifyBlog = await blog.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        });

        res.send(modifyBlog);
        console.log('ho modificato il blog con ID')

    } catch (error) {
        next(error)
    }
})


// DELETE DEL COMMENTO CON ID
blogRoute.delete('/:id/comment/:id', async(req, res, next) =>{
    try {
        await blog.deleteOne({
            _id: req.params.id,
        })

        res.send('il commento è stato eliminato');

    } catch (error) {
        next(error)
    }
})


// DELETE DEL BLOG CON ID
blogRoute.delete('/:id', async(req, res, next) =>{
    try {
        await blog.deleteOne({
            _id: req.params.id,
        })

        res.send('il blog è stato eliminato');

    } catch (error) {
        next(error)
    }
})


 // RICHIESTA PATCH IMG COVER
 blogRoute.patch("/:id/cover", cloudinaryCover, async (req, res, next) => {
    try {
        console.log(req.file.path);
      let updateBlogCover = await blog.findByIdAndUpdate(
        req.params.id,
        { cover: req.file.path },
        { new: true }
      );

      res.send(updateBlogCover);
    } catch (error) {

      next(error);
    }
  });