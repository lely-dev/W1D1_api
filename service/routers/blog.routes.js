import { Router } from "express";
import blog from "../models/blog.model.js";
import cloudinaryCover from '../middlewares/multer.cover.js'

export const blogRoute = Router();

// GET LISTA DI BLOG POST
blogRoute.get('/', async (req, res) => {
    res.send('sono nei post')
})


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


// GET POST TRAMITE ID
blogRoute.get('/:id', async (req, res, next) => {
    try {
        let blogId = await blog.findById(req.params.id, req.body);

        res.send(blogId)
        console.log('sono nel blog con ID')
    } catch (error) {
        next(error)
    }

})


// POST DEL NUOVO BLOG
blogRoute.post('/', async(req,res, next)=>{
    try {
        let newPost = await blog.create(req.body);

        res.send(newPost).status(200);
        console.log('ho fatto il post di un nuovo blog')
        
    } catch (error) {
        next(error)
    }
})


// POST DEL COMMENTO AL BLOG
blogRoute.post('/id', async(req,res, next)=>{
    try {
        let newComment = await blog.create(req.body);

        res.send(newComment).status(200);
        console.log('ho creato un nuovo commento al blog')
        
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